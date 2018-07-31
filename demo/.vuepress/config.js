module.exports = {
  title: 'vuepress-theme-bulma',
  description: 'Bulma.css theme for VuePress',
  base: 'https://nakorndev.github.io/vuepress-theme-bulma/',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css', integrity: 'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ', crossorigin: 'anonymous' }]
  ],
  displayAllHeaders: false,
  repo: 'nakorndev/vuepress-theme-bulma',
  repoLabel: 'Contribute!',
  docsRepo: 'vuejs/vuepress',
  docsDir: 'demo',
  docsBranch: 'master',
  editLinks: true,
  editLinkText: 'Edit me!',
  lastUpdated: 'Last Updated',
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
      { text: 'Lorem', link: '/lorem/' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/' },
      { text: 'Dropdown', items: [
        { text: 'Google', link: 'https://www.google.com' },
        { text: 'And google!', link: 'https://www.google.com' }
      ] }
    ],
    displayAllHeaders: true,
    serviceWorker: true,
    sidebar: {
      '/lorem/': [
        {
          title: 'Lorem',
          collapsable: true,
          children: [
            '',
            'article',
            'frontmatter',
            'table',
            'emoji',
            'custom-containers',
            'code-blocks',
            'markdown-it',
            'markdown-vuepress'
          ]
        }
      ]
    }
  },
}
