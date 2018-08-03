module.exports = {
  title: 'vuepress-theme-bulma',
  description: 'Bulma.css theme for VuePress',
  base: '/vuepress-theme-bulma/',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css', integrity: 'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ', crossorigin: 'anonymous' }]
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
      { icon: 'fas fa-book', iconClass: 'has-text-danger', text: 'Lorem', link: '/lorem/' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/' },
      { icon: 'fab fa-lg fa-github', iconClass: 'is-medium', text: 'GitHub', link: 'https://github.com/nakorndev/vuepress-theme-bulma' },
      { text: 'Dropdown', items: [
        { text: 'Google', link: 'https://www.google.com' },
        { text: 'And google!', link: 'https://www.google.co.th/' }
      ] }
    ],
    displayAllHeaders: true,
    serviceWorker: true,
    sidebar: [
      {
        title: 'Lorem',
        icon: 'fas fa-star',
        iconClass: 'has-background-success has-text-warning button is-rounded',
        collapsable: true,
        children: [
          '/lorem/',
          '/lorem/article',
          '/lorem/frontmatter',
          '/lorem/table',
          '/lorem/emoji',
          '/lorem/custom-containers',
          '/lorem/code-blocks',
          '/lorem/markdown-it',
          '/lorem/markdown-vuepress',
          '/lorem/custom-layout'
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
