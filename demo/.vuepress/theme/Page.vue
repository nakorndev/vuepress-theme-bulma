<template>
  <section id="content" class="section">
    <div class="container has-sidebar">
      <slot name="top"/>
      <div class="field" v-if="editLink" :class="{ 'has-no-frontmatter': !(hasFrontMatter) }">
        <div class="control is-pulled-right">
          <a class="button is-text is-none-decoration has-text-link" :href="editLink" target="_blank" rel="noopener noreferrer">
            <span class="icon"><i class="fas fa-edit"></i></span>
            <span>{{ editLinkText }}</span>
          </a>
        </div>
      </div>
      <section v-if="hasFrontMatter">
        <div class="media">
          <div class="media-left is-hidden-touch">
            <a class="is-hoverable non-blank" href="#">
              <span class="icon is-heading has-text-link">
                <i :class="$page.frontmatter.icon"></i>
              </span>
            </a>
          </div>
          <div class="media-body">
            <div class="title">
              <a class="non-blank" v-if="!$page.frontmatter.disable_hashtag" href="#">#</a> {{ $page.frontmatter.title }}
            </div>
            <div class="subtitle" v-html="$page.frontmatter.description"></div>
          </div>
        </div>
        <hr>
      </section>
      <Content :custom="false"/>
      <div class="page-nav" v-if="prev || next">
        <router-link v-if="prev" :to="prev.path" class="button is-hidden-touch is-text is-none-decoration is-left is-pagination has-text-link" :title="prev.title || prev.path">
          <i class="fas fa-chevron-left"></i>
        </router-link>
        <router-link v-if="next" :to="next.path" class="button is-hidden-touch is-text is-none-decoration is-right is-pagination has-text-link" :title="next.title || next.path">
          <i class="fas fa-chevron-right"></i>
        </router-link>
      </div>
      <hr>
      <div class="has-text-right" v-if="lastUpdated">
        <strong><i class="fas fa-wrench"></i> {{ lastUpdatedText }}: </strong>
        <span>{{ lastUpdated }}</span>
      </div>
      <slot name="bottom"/>
    </div>
  </section>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE, createElementFromHTML } from './util'

export default {
  props: ['sidebarItems'],
  computed: {
    hasFrontMatter () {
      return this.$page.frontmatter.title && this.$page.frontmatter.description && this.$page.frontmatter.icon
    },
    lastUpdated () {
      if (this.$page.lastUpdated) {
        return new Date(this.$page.lastUpdated).toLocaleString(this.$lang)
      }
    },
    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },
    prev () {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },
    next () {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },
    editLink () {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }
      if (docsRepo && editLinks) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, path)
      }
    },
    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    }
  },
  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : repo
        return (
          base.replace(endingSlashRE, '') +
           `/${docsBranch}` +
           (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
           path +
           `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`

      return (
        base.replace(endingSlashRE, '') +
        `/edit/${docsBranch}` +
        (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
        path
      )
    },
    initImageModal () {
      Array.from(document.getElementById('content').getElementsByTagName('img')).forEach(img => {
        img.addEventListener('click', this.eventImageModal)
      })
    },
    removeImageModalEvent () {
      Array.from(document.getElementById('content').getElementsByTagName('img')).forEach(img => {
        img.removeEventListener('click', this.eventImageModal)
      })
    },
    eventImageModal (e) {
      const rootClass = document.getElementsByTagName('html')[0].classList
      rootClass.add('is-clipped')
      document.body.appendChild(createElementFromHTML(`
        <div id="image-modal" class="modal is-active">
          <div class="modal-background"></div>
          <div class="modal-content">
            <img src="${e.target.src}">
          </div>
          <button class="modal-close is-large" aria-label="close"></button>
        </div>
      `))
      document.getElementById('image-modal').addEventListener('click', e => {
        rootClass.remove('is-clipped')
        document.getElementById('image-modal').outerHTML = ''
      })
    }
  },
  watch: {
    $route() {
      this.initImageModal()
    }
  },
  mounted () {
    this.initImageModal()
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = []
  items.forEach(item => {
    if (item.type === 'group') {
      res.push(...item.children || [])
    } else {
      res.push(item)
    }
  })
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === page.path) {
      return res[i + offset]
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/initial-variables";
@media screen and (min-width: $desktop) {
  .container.has-sidebar {
    padding-left: 319px;
  }
}
.media {
  margin-top: 1.75rem;
}
h1, h2, h3, h4, h5, h6 {
  &:hover .header-anchor {
    opacity: 1
  }
}
.icon.is-heading {
  border: 2px solid #3273dc;
  border-radius: 50%;
  padding: 30px;
  font-size: 2rem;
  &:hover {
    border-color: #363636;
    i {
      color: #363636;
    }
  }
}
.has-no-frontmatter a.button {
  margin-top: 4.5rem;
}
a.header-anchor {
  font-size: 0.85em;
  float: left;
  margin-left: -0.87em;
  padding-right: 0.23em;
  margin-top: 0.125em;
  opacity: 0;
  &:hover {
    text-decoration: none;
  }
}
section.no-sidebar .menu {
  display: none;
}
.is-none-decoration {
  text-decoration: none !important;
}
main .content {
  h1 {
    margin-bottom: 1em;
  }
  h2 {
    border-bottom: 2px solid whitesmoke;
    padding-bottom: 0.5em;
    margin-bottom: 1em;
  }
  &:not(.custom)>h1, &:not(.custom)>h2, &:not(.custom)>h3, &:not(.custom)>h4, &:not(.custom)>h5, &:not(.custom)>h6 {
    margin-top: -3.5rem;
    padding-top: 4.5rem;
  }
  .icon.outbound {
    height: 1em;
    width: 1em;
    margin-left: 2px;
  }
  abbr {
    text-decoration: none;
    cursor: help;
    border: 1px solid #d4d4d4;
    padding: 0 5px;
    border-radius: 4px;
  }
  mark {
    background-color: #ffff06;
    border-radius: 4px;
    padding: 1px 10px;
  }
  img {
    display: block;
    margin: 0 auto;
    max-width: 512px;
    &:hover {
      cursor: pointer;
    }
  }
  .footnote-ref :target::before {
    content: "";
    display: inline-block;
    height: 4.5rem;
    margin-top: -4.5rem;
  }
}
.button.is-pagination {
  position: fixed;
  top: calc(50% - (300px / 2));
  bottom: 0;
  display: flex;
  height: 300px;
  border-radius: 5px;
  padding: 0 .5em;
  margin: .5em 1em;
  align-items: center;
  justify-content: center;
  &.is-right {
    right: 0
  }
  &.is-left {
    left: 320px;
  }
}
</style>
