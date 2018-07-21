module.exports = {
  title: 'vuepress-theme-bulma',
  description: 'Bulma.css theme for VuePress',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: 'https://vuepress.vuejs.org/hero.png',
    nav: [
      { text: 'Lorem', link: '/lorem/article' },
      { text: 'VuePress', link: 'https://vuepress.vuejs.org/' }
    ],
    displayAllHeaders: true,
    serviceWorker: true,
    sidebar: {
      '/lorem/': [
        {
          title: 'Lorem',
          collapsable: true,
          children: [
            'article',
            'frontmatter',
            'table',
            'emoji',
            'custom-containers',
            'code-blocks',
            'other-markdown'
          ]
        }
      ]
    },
    repo: 'nakorndev/vuepress-theme-bulma',
    repoLabel: 'Contribute!',
    docsRepo: 'vuejs/vuepress',
    docsDir: 'demo',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Help us improve this page? Maybe not.'
  },
}
