import Bleed from 'pliny/ui/Bleed'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import LazyImage from '@/components/LazyImage'

const MAX_DISPLAY = 51

export default function Home({ posts }) {
  const trendingPosts = posts.filter((post) => post.is_trending)
  const popularPosts = posts.filter((post) => post.is_popular)
  const featuredPosts = posts.filter((post) => post.is_featured)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[2000px] mx-auto">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-8 md:p-12 rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Video Editing YouTube News & Videos
            </h1>
            <p className="text-white/90">
              EditorCuts provides insightful Video Editing YouTube commentary. Get
              expert reviews, trending videos, and exclusive commentary.
            </p>
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      {trendingPosts.length > 0 && (
        <section className="py-6 bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[2000px] mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Trending Now</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {trendingPosts.map((post, index) => {
                const displayImage =
                  post.images && post.images.length > 0 ? post.images[0] : 'https://picsum.photos/seed/picsum/800/400'
                const isFirstImage = index === 0
                return (
                  <div
                    key={post.slug}
                    className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
                  >
                    {isFirstImage ? (
                        <div className="container">
                        <Image src={displayImage} alt={post.title} fetchPriority="high" className="w-full object-cover aspect-video" />
                        </div>
                    ) : (
                        <LazyImage src={displayImage} alt={post.title} classes="lazy-image w-full object-cover aspect-video" />
                    )}                  
                    <div className="p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleString(siteMetadata.locale, {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          })}
                        </time>
                      </div>
                      <h3 className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">{post.summary}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Popular News Section */}
      {popularPosts.length > 0 && (
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[2000px] mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Popular News</h2>
            <div className="grid grid-cols-1 gap-8">{/* Single column for all screen sizes */}
              {popularPosts.map((post, index) => (
                <div key={post.slug} className="flex flex-col md:flex-row gap-4">{/* Use flex-col for stacking on small screens */}
                  <LazyImage
                    src={post.images && post.images.length > 0 ? post.images[0] : 'https://picsum.photos/seed/picsum/800/400'}
                    alt={post.title}
                    classes="lazy-image object-cover aspect-video w-full md:w-auto rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleString(siteMetadata.locale, {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        })}
                      </time>
                    </div>
                    <h3 className="text-xl font-semibold mt-2 text-gray-900 dark:text-white">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{post.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured News Section */}
      {featuredPosts.length > 0 && (
      <section className="py-6 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="max-w-[2000px] mx-auto relative">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">2024 Dodge Charger Daytona Scat Pack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
            <div key={post.slug} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <LazyImage
                src={post.images && post.images.length > 0 ? post.images[0] : 'https://picsum.photos/seed/picsum/800/400'}
                alt={post.title}
                classes="lazy-image w-full object-cover aspect-video"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 px-3 py-1 rounded-full text-sm">Charger Daytona Scat Pack</span>
                </div>
                <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleString(siteMetadata.locale, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </time>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{post.summary}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Latest News Section */}
      <section className="py-6">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Latest News</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
        {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => {
            const { slug, date, title, summary, tags, images } = post
            const displayImage =
              images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'
            const isFirstImage = index === 0
            return (
              <div key={slug} className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
                {isFirstImage ? (
                    <div className="container">
                    <Image src={displayImage} alt={title} fetchPriority="high" className="w-4/3 object-cover aspect-video rounded-lg" />
                    </div>
                ) : (
                    <LazyImage src={displayImage} alt={title} classes="lazy-image w-full object-cover aspect-video" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end z-20 translate-y-4">
                  <div className="flex items-center mb-2">
                    <span className="inline-block font-bold text-md text-black bg-yellow-300 px-2 py-1 rounded">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-7">
                    <Link href={`/blog/${slug}`}>{title}</Link>
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
        {posts.length > MAX_DISPLAY && (
        <div className="px-6 py-6 flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All Video Editing Youtube Articles"
          >
            Video Editing Youtube Articles &rarr;
          </Link>
        </div>
      )}
      </section>
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </div>
  )
}
