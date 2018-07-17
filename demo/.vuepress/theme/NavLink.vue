<template>
  <router-link
    class="navbar-item"
    :to="link"
    v-if="!isExternal(link)"
    :exact="exact"
  >{{ item.text }}</router-link>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from './util'

export default {
  props: {
    item: {
      required: true
    }
  },
  computed: {
    link () {
      return ensureExt(this.item.link)
    },
    exact () {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link)
      }
      return this.link === '/'
    }
  },
  methods: {
    isExternal,
    isMailto,
    isTel
  }
}
</script>
