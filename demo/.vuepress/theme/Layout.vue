<template>
  <section
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">
    <Navbar v-if="shouldShowNavbar"/>
    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
    <SWUpdatePopup :updateEvent="swUpdateEvent" />
    <Sidebar :items="sidebarItems" class="is-hidden-touch">
      <slot name="sidebar-top" slot="top"/>
      <slot name="sidebar-bottom" slot="bottom"/>
    </Sidebar>
    <main>
      <div class="custom-layout" v-if="$page.frontmatter.layout">
        <component :is="$page.frontmatter.layout"/>
      </div>
      <Home v-else-if="$page.frontmatter.home"/>
      <Page v-else :sidebar-items="sidebarItems">
        <slot name="page-top" slot="top"/>
        <slot name="page-bottom" slot="bottom"/>
      </Page>
    </main>
  </section>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Home from './Home.vue'
import Navbar from './Navbar.vue'
import Page from './Page.vue'
import Sidebar from './Sidebar.vue'
import SWUpdatePopup from './SWUpdatePopup.vue'
import { resolveSidebarItems } from './util'

export default {
  components: { Home, Page, Sidebar, Navbar, SWUpdatePopup },
  data () {
    return {
      isSidebarOpen: false,
      swUpdateEvent: null
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false ||
        themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },
    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.layout &&
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      )
    },
    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  mounted () {
    window.addEventListener('scroll', this.onScroll)

    // configure progress bar
    nprogress.configure({ showSpinner: false })

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start()
      }
      next()
    })

    this.$router.afterEach(() => {
      nprogress.done()
      this.isSidebarOpen = false
    })

    this.$on('sw-updated', this.onSWUpdated)
  },

  methods: {
    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },
    onSWUpdated (e) {
      this.swUpdateEvent = e
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/initial-variables";
.navbar .navbar-item .icon.outbound {
  margin-left: 5px;
  width: 1.2em;
}
.custom-block {
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 1rem;
  border-color: #dbdbdb;
  border-radius: 4px;
  border-style: solid;
  border-width: 0 0 0 4px;
  color: #4a4a4a;
  padding: 1.25em 1.5em;
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
  &.tip {
    border-color: #3273dc;
    color: #22509a;
    background-color: #f6f9fe;
    .custom-block-title::before {
      content: '✨ ';
    }
  }
  &.warning {
    border-color: #ffdd57;
    color: #3b3108;
    background-color: #fffdf5;
    .custom-block-title::before {
      content: '💥 ';
    }
  }
  &.danger {
    border-color: #ff3860;
    color: #cd0930;
    background-color: #fff5f7;
    .custom-block-title::before {
      content: '⛔ ';
    }
  }
  .custom-block-title {
    font-weight: bold;
  }
}
// Fix class disrupt syntax hightlight
code .number {
  align-items: inherit;
  background-color: inherit;
  border-radius: inherit;
  display: inherit;
  font-size: inherit;
  height: inherit;
  justify-content: inherit;
  margin-right: inherit;
  min-width: inherit;
  padding: inherit;
  text-align: inherit;
  vertical-align: inherit;
}
.content pre code {
  font-size: 1rem;
}
.navbar-brand a.navbar-item:hover {
  background-color: $white-bis !important;
}
</style>
<style src="bulma/bulma.sass" lang="scss"></style>
<style src="prismjs/themes/prism-tomorrow.css"></style>

<style lang="stylus">
@import './styles/arrow.styl'
@import './styles/toc.styl'
@import './styles/nprogress.styl'
@import './styles/code.styl'
</style>
