module.exports = {
  title: 'vuepress-theme-bulma',
  description: 'A pure Bulma.css theme for VuePress',
  base: '/vuepress-theme-bulma/',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css' }]
  ],
  serviceWorker: true,
  markdown: {
    lineNumbers: true,
    config: md => {
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-sub'))
      md.use(require('markdown-it-sup'))
      md.use(require('markdown-it-ins'))
      md.use(require('markdown-it-mark'))
      md.use(require('markdown-it-deflist'))
      md.use(require('markdown-it-abbr'))
    }
  },
  themeConfig: {
    logo: 'https://vuepress.vuejs.org/hero.png',
    nav: [
      { icon: 'fas fa-book', iconClass: 'has-text-danger', text: 'Documentation', link: '/docs/' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/' },
      { icon: 'fab fa-lg fa-github', iconClass: 'is-medium', text: 'GitHub', link: 'https://github.com/nakorndev/vuepress-theme-bulma' },
      { text: 'Dropdown', items: [
        { text: 'Google', link: 'https://www.google.com' },
        { text: 'And yet another google!', link: 'https://www.google.co.th/' }
      ] }
    ],
    displayAllHeaders: true,
    serviceWorker: true,
    sidebar: [
      {
        title: 'Documentation',
        icon: 'fas fa-star',
        iconClass: 'has-text-warning',
        collapsable: true,
        children: [
          '/docs/',
          '/docs/table-of-contents',
          '/docs/front-matters',
          '/docs/pictures',
          '/docs/tables',
          '/docs/emoji',
          '/docs/custom-containers',
          '/docs/code-blocks',
          '/docs/markdown-it',
          '/docs/markdown-vuepress',
          '/docs/custom-layout',
          '/docs/buefy-demo'
        ]
      },
      {
        title: 'Lorem2',
        collapsable: true,
        children: [
          '/lorem2/',
          '/lorem2/test'
        ]
      }
    ],
    displayAllHeaders: false,
    repo: 'nakorndev/vuepress-theme-bulma',
    repoLabel: 'Contribute!',
    docsRepo: 'nakorndev/vuepress-theme-bulma',
    docsDir: 'demo',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Edit me!',
    lastUpdated: 'Last Updated',
  },
}
