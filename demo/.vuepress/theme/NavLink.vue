<template>
  <router-link
    class="navbar-item"
    :to="link"
    v-if="!isExternal(link)"
    :exact="exact"
  >
    <span v-if="item.icon" class="icon" :class="item.iconClass"><i :class="item.icon"></i></span>
    <span>{{ item.text }}</span>
  </router-link>
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
