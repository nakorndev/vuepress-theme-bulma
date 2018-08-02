<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          <i class="fas fa-exclamation-triangle has-text-warning"></i> 404
          <small class="has-text-grey">Nothing here!</small>
        </h1>
        <h2 class="subtitle">
          <router-link class="button is-large" to="/">Return home</router-link>
        </h2>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
h1.title {
  padding-bottom: 3rem;
  font-size: 4rem;
  small {
    display: block;
    margin-top: 1.5rem;
    font-size: 1.5rem;
  }
}
</style>
