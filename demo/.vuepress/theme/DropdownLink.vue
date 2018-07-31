<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      {{ item.text }}
    </a>
    <div class="navbar-dropdown">
      <router-link
        class="navbar-item"
        :to="subItem.link"
        v-for="(subItem, index) in item.items"
        v-if="!isExternal(subItem.link)"
        :key="subItem.link || index"
      >
        {{ subItem.text }}
      </router-link>
      <a
        class="navbar-item"
        :href="subItem.link"
        v-for="(subItem, index) in item.items"
        v-if="isExternal(subItem.link)"
        :key="subItem.link || index"
        target="_blank"
      >
        {{ subItem.text }}
      </a>
    </div>
  </div>
</template>

<script>
import NavLink from './NavLink.vue'
import { isExternal, isMailto, isTel, ensureExt } from './util'

export default {
  components: { NavLink },
  data () {
    return {
      open: false
    }
  },
  props: {
    item: {
      required: true
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    },
    isExternal
  }
}
</script>
