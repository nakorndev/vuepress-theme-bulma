<template>
  <div class="home">
    <div class="hero">
      <div class="hero-body">
        <div class="has-text-centered">
          <img class="hero-image" v-if="data.heroImage" :src="$withBase(data.heroImage)" alt="hero">
          <h1 class="title">{{ data.heroText || $title || 'Hello' }}</h1>
          <p class="subtitle">
            {{ data.tagline || $description || 'Welcome to your VuePress site' }}
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="has-text-centered">
        <router-link :to="data.actionLink" class="button is-large" v-if="data.actionText && data.actionLink">
          {{ data.actionText }}
        </router-link>
      </div>
      <section class="section">
        <div class="columns" v-if="data.features && data.features.length">
          <div class="column" v-for="feature in data.features">
            <h2 class="title is-size-4">{{ feature.title }}</h2>
            <p>{{ feature.details }}</p>
          </div>
        </div>
      </section>
      <Content custom/>
    </div>
    <footer class="footer" v-if="data.footer">
      <div class="has-text-centered">
        {{ data.footer }}
      </div>
    </footer>
  </div>
</template>

<script>
import NavLink from './NavLink.vue'

export default {
  components: { NavLink },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="scss">
.hero-image {
  height: 20rem;
  margin-top: 2rem;
}
</style>
