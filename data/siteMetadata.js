/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Video Editing YouTube News & Videos',
  author: '',
  owner: 'editorcuts',
  headerTitle: 'EditorCuts',
  description: 'EditorCuts provides insightful Video Editing YouTube commentary. Get expert reviews, trending videos, and exclusive commentary.',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://www.editorcuts.com',
  siteRepo: '',
  siteLogo: '/static/images/logo1.png',
  siteBackground: '/static/images/wcbkg01.png',
  socialBanner: '/static/images/twitter-card.png',
  mastodon: '',
  email: 'wheelcircuitapp+editorcuts@gmail.com',
  tiktok: 'https://www.tiktok.com/@editorcuts',
  twitter: 'https://twitter.com/editorcuts',
  facebook: 'https://www.facebook.com/editorcuts/',
  instagram: 'https://www.instagram.com/editorcuts/',
  youtube: 'https://www.youtube.com/@EditorCuts',
  linkedin: '',
  locale: 'en-US',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    // umamiAnalytics: {
    //   // We use an env variable for this site to avoid other users cloning our analytics ID
    //   umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    googleAnalytics: {
      googleAnalyticsId: 'G-1T3JR4F47B', // e.g. G-XXXXXXX
    },
  },
  newsletter: false,
  // newsletter: {
  //   // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
  //   // Please add your .env file and modify it according to your selection
  //   provider: 'buttondown',
  // },
  comments: {
    disqus: {
      // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
      shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
