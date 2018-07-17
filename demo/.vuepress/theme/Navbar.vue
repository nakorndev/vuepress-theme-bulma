<template>
  <header class="navbar has-shadow is-spaced">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
    <div class="navbar-brand">
      <router-link :to="$localePath" class="navbar-item">
        <img class="logo"
          v-if="$site.themeConfig.logo"
          :src="$withBase($site.themeConfig.logo)">
        <span class="site-name"
          v-if="$siteTitle"
          :class="{ 'is-hidden-mobile': $site.themeConfig.logo }">
          {{ $siteTitle }}
        </span>
      </router-link>
    </div>
    <NavLinks class="is-hidden-mobile"/>
    <div class="navbar-end">
      <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia"/>
      <SearchBox v-else-if="$site.themeConfig.search !== false"/>
      <a v-if="isExternal(item.link)"
        v-for="item in userLinks"
        :key="item.link"
        :href="link(item)"
        class="navbar-item external"
        :target="isMailto(link(item)) || isTel(link(item)) ? null : '_blank'"
        :rel="isMailto(link(item)) || isTel(link(item)) ? null : 'noopener noreferrer'"
      >
        {{ item.text }}
        <OutboundLink/>
      </a>
      <a v-if="repoLink"
        :href="repoLink"
        class="navbar-item"
        target="_blank"
        rel="noopener noreferrer">
        {{ repoLabel }}
        <OutboundLink/>
      </a>
    </div>
  </header>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from './SearchBox.vue'
import NavLinks from './NavLinks.vue'
import { isExternal, isMailto, isTel, ensureExt, resolveNavLinkItem } from './util'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },
  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },
    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },
    repoLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
    },
    repoLabel () {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    },
    userNav () {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },
    nav () {
      const { locales } = this.$site
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path
        const routes = this.$router.options.routes
        const themeLocales = this.$site.themeConfig.locales || {}
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          items: Object.keys(locales).map(path => {
            const locale = locales[path]
            const text = themeLocales[path] && themeLocales[path].label || locale.lang
            let link
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path)
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          })
        }
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },
    userLinks () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    }
  },
  methods: {
    link (item) {
      return ensureExt(item.link)
    },
    isExternal,
    isMailto,
    isTel
  }
}
</script>

<style lang="scss">
.logo {
  margin-right: 5px;
}
</style>
