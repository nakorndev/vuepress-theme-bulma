<template>
  <div class="container has-sidebar">
    <slot name="top"/>
    <div class="field" v-if="editLink" :class="{ 'has-no-frontmatter': !(hasFrontMatter) }">
      <div class="control is-pulled-right">
        <a class="button is-text is-none-decoration" :href="editLink" target="_blank" rel="noopener noreferrer">
          <span class="icon"><i class="fas fa-edit"></i></span>
          <span>{{ editLinkText }}</span>
        </a>
      </div>
    </div>
    <section v-if="hasFrontMatter">
      <div class="media">
        <div class="media-left is-hidden-touch">
          <a class="is-hoverable non-blank" :href="$page.path + '#'">
            <span class="icon is-heading has-text-link">
              <i :class="$page.frontmatter.icon"></i>
            </span>
          </a>
        </div>
        <div class="media-body">
          <div class="title">
            <a class="non-blank" v-if="!$page.frontmatter.disable_hashtag" :href="$page.path + '#'">#</a> {{ $page.frontmatter.title }}
          </div>
          <div class="subtitle" v-html="$page.frontmatter.description"></div>
        </div>
      </div>
      <hr>
    </section>
    <Content :custom="false"/>
    <div class="page-edit">
      <div class="last-updated" v-if="lastUpdated">
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </div>
    <div class="page-nav" v-if="prev || next">
      <p class="inner">
        <span v-if="prev" class="prev">
          ← <router-link v-if="prev" class="prev" :to="prev.path">
            {{ prev.title || prev.path }}
          </router-link>
        </span>
        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">
            {{ next.title || next.path }}
          </router-link> →
        </span>
      </p>
    </div>
    <slot name="bottom"/>
  </div>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'

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
    }
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
}
</style>
