import siteMetadata from '../../data/siteMetadata.js'
import { genPageMetadata } from 'app/seo'
import { slug } from 'github-slugger'

// tried to use the github slugger but stripped too much and caused an error
function slugify(text: string): string {
  return text.toLowerCase().replace(/ /g, '-')
}

function abbreviateNumber(num: number): string {
  const abbreviations = ['', 'K', 'M', 'B', 'T']
  const absNum = Math.abs(num)
  const sign = num < 0 ? '-' : ''

  let tier = (Math.log10(absNum) / 3) | 0
  if (tier > 4) tier = 4

  const scaled = absNum / Math.pow(10, tier * 3)

  return sign + scaled.toFixed(1).replace(/\.0$/, '') + abbreviations[tier]
}

export const metadata = genPageMetadata({
  title: 'Most Popular Video Editing Youtube Channels',
  description: 'The Top Video Editing related Youtube Channels updated hourly',
})

export default async function ThreeDChannelRankings() {
  const youtubeSources = await getData()
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[2000px] mx-auto">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-8 md:p-12 rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Most Popular Video Editing Youtube Channels
            </h1>
            <p className="text-white/90 max-w-2xl">
              The Top Video Editing related Youtube Channels (updated hourly):
            </p>
          </div>
        </div>
      </section>

      {/* Rankings Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[2000px] mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {youtubeSources &&
            youtubeSources.map((source, index) => (
              <article
                key={index}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Rank Badge */}
                <div className="absolute z-10 top-4 left-4 bg-gray-500 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  {source.rank}
                </div>

                {/* Channel Thumbnail */}
                <div className="relative pt-[56.25%]">
                  <img
                    src={source.thumbnail}
                    alt={source.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Channel Info */}
                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    {/* Title and Blog Link */}
                    <div>
                      <h2>
                        <a
                          href={source.custom_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
                        >
                          {source.title}
                        </a>
                      </h2>
                      <a
                        href={source.tag_url}
                        className="mt-2 inline-block text-sm text-gray-500 dark:text-gray-400 hover:underline"
                      >
                        Read Articles →
                      </a>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {source.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-center px-1">
                        <div
                          className="text-lg font-bold text-gray-900 dark:text-white"
                          title={
                            source.subscriber_count ? source.subscriber_count.toLocaleString() : '0'
                          }
                        >
                          {abbreviateNumber(source.subscriber_count)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Subscribers
                        </div>
                      </div>
                      <div className="text-center px-1">
                        <div
                          className="text-lg font-bold text-gray-900 dark:text-white"
                          title={source.view_count ? source.view_count.toLocaleString() : '0'}
                        >
                          {abbreviateNumber(source.view_count)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Views</div>
                      </div>
                      <div className="text-center px-1">
                        <div
                          className="text-lg font-bold text-gray-900 dark:text-white"
                          title={source.video_count ? source.video_count.toLocaleString() : '0'}
                        >
                          {abbreviateNumber(source.video_count)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Videos</div>
                      </div>
                    </div>

                    {/* Recent Articles */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Recent Articles
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {source.relatedArticles.map((article, articleIndex) => (
                          <a
                            key={articleIndex}
                            href={`/blog/${article.slug}`}
                            className="group"
                            title={article.title}
                          >
                            <div className="relative pt-[56.25%] rounded-md overflow-hidden">
                              <img
                                src={article.thumbnail}
                                alt={article.thumbnail}
                                className="absolute inset-0 w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
                              />
                            </div>
                            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-2 group-hover:text-gray-500 dark:group-hover:text-gray-400">
                              {article.blog_title}
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </section>
    </div>
  )
}

async function getData() {
  const API_URL = 'http://localhost:1337/graphql'
  const HEADERS = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
  }
  const query = `
    query getYoutubeSources {
      sources(sort: "subscriber_count", where: { owner: "${siteMetadata.owner}", platform_id: { title: "Youtube" } }) {
        title
        url
        channel_id
        custom_url
        thumbnail
        subscriber_count
        view_count
        video_count
        createdAt
      }
    }
  `
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ query }),
  })

  if (!res.ok) {
    console.error('Failed to fetch data:', res.statusText)
  }

  const { data, errors } = await res.json()
  if (errors) {
    console.error('GraphQL errors:', errors)
  }
  const youtubeBaseUrl = 'https://www.youtube.com/'
  const sortedSources = data.sources
    ? data.sources.sort((a, b) => b.subscriber_count - a.subscriber_count)
    : []

  if (!data || !data.sources) {
    throw new Error('No sources data found')
  }
  // Fetch related articles for each source
  await Promise.all(
    sortedSources.map(async (source, index) => {
      try {
        const relatedArticles = await fetchRelatedArticles(source.title, source.channel_id)
        source.custom_url = youtubeBaseUrl + source.custom_url
        source.rank = index + 1
        source.tag_url = `/categories/${slug(source.title)}`
        source.relatedArticles = relatedArticles.slice(0, 3) // Get the 3 most recent articles
      } catch (err) {
        console.error(`Failed to fetch related articles for ${source.title}:`, err)
      }
    })
  )

  return sortedSources
}

async function fetchRelatedArticles(channelName, currentVideoId) {
  const API_URL = 'http://localhost:1337/graphql'
  const HEADERS = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
  }
  const query = `
    query getRelatedArticles {
      youtubeVideos(
        sort: "createdAt:desc"
        where: { published: true, owner: "${siteMetadata.owner}", channel_name:"${channelName}", video_id_ne: "${currentVideoId}" }
        limit: 4
      ) {
        title
        is_trending
        blog_title
        video_id
        channel_name
        channel_url
        url
        thumbnail
        slug
        summary_video
        summary_comments
        short_summary
        keywords
        published
      }
    }
  `

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ query }),
  })

  const { data, errors } = await response.json()
  if (errors) {
    console.error('GraphQL errors when fetching related articles:', errors)
    return []
  }

  const articles = data.youtubeVideos || []
  return articles
}
