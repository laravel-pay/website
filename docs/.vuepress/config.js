const categories = require('../../providers')

const generatedSidebar = categories.map(cat => {
  return {
    title: cat.name,
    collapsable: cat.collapsable || false,
    children: cat.channels.map(c => {
      return [`/${c.slug}/`, c.name]
    }),
  }
})

module.exports = {
  title: 'Laravel Payment Providers',
  description: 'A collection of Payment Providers for Laravel 5.5+, 6.x & 7.x',
  dest: './dist',

  themeConfig: {
    // algolia: {
    //   apiKey: '662d6a5e1b798d17b5eaaeb770b415e7',
    //   indexName: 'laravel-pay'
    // },
    channelCount: categories.reduce((count, cat) => count + cat.channels.length, 0),
    sidebarDepth: 1,
    nav: [
      { text: 'About / FAQ', link: '/about' },
      {
        text: 'Github',
        link: 'https://github.com/laravel-pay',
      },
      {
        text: 'Packagist',
        link: 'https://packagist.org/packages/laravel-pay/',
      },
    ],
    sidebar: [
      {
        title: 'Documentation',
        collapsable: false,
        children: [
          ['/about', 'About / FAQ']
        ]
      }
    ].concat(generatedSidebar),
  },
  async additionalPages () {
    let allChannels = []

    categories.map(cat => {
      cat.channels.map(c => {
        if (cat.name === 'Deprecated') c.deprecated = true;
        // if (cat.name === 'SMS / Voip') c.sms = true;
        allChannels.push(c)
      })
    })

    const axios = require('axios')
    const { mapLimit } = require('async')

    return mapLimit(allChannels, 3, async (channel) => {
      if (!global['REPO_CACHE']) global['REPO_CACHE'] = {};

      if (!global['REPO_CACHE'][channel.slug]) {
        const res = await axios.get(`https://raw.githack.com/laravel-pay/${channel.slug}/master/README.md`)
        console.log(`Fetched readme for ${channel.slug}`)

        let content = res.data;

        content = content.replace(/\](?!.*(http|#))\(/g, `](https://github.com/laravel-pay/${channel.slug}/blob/master/`)

        content = `<ChannelHeader slug="${channel.slug}" :maintainers='${JSON.stringify(channel.maintainers)}'></ChannelHeader>
` + content;

        if (channel.deprecated) {
          content = `::: danger
This channel is deprecated. Please see the [GitHub Repo](https://github.com/laravel-pay/${channel.slug}) for more information
:::\n` + content
        }

        return {
          path: `/${channel.slug}/`,
          content,
        }
      }

      return global['REPO_CACHE'][channel.slug]
    })
  },
  head: [
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' }],
    ['link', { rel: 'icon" type="image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon" type="image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['style', {}, 'img + .icon.outbound {display: none;}']
  ],
  extraWatchFiles: [
    '../../providers.js'
  ],
  plugins: [
    // [
    //   '@vuepress/google-analytics',
    //   {
    //     'ga': 'UA-150688103-1'
    //   }
    // ]
  ]
}


