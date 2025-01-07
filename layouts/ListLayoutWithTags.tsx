/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import LazyImage from '@/components/LazyImage'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  tags: string
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 pb-5 space-y-2 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tags,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  const isReview = tags.toLowerCase().endsWith('reviews') || tags.toLowerCase().endsWith('reviewed')
  const displayText = isReview ? tags : `${tags} Articles`
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative py-6">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 pb-5">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-8 md:p-12 rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h1>
          </div>
        </div>
        <div>
          <ul>
            <section className="py-6 bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
              <div className="max-w-[2000px] mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  {tags ? (
                    <p>{displayText}</p>
                  ) : (
                    <p>
                      {pagination && pagination.currentPage > 1
                        ? `All Video Editing News Page ${pagination.currentPage}`
                        : 'All Video Editing News'}
                    </p>
                  )}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayPosts.map((post, index) => {
                    const { path, date, title, summary, tags, images } = post
                    const displayImage =
                      images && images.length > 0
                        ? images[0]
                        : 'https://picsum.photos/seed/picsum/800/400'
                    const isFirstImage = index === 0
                    return (
                      <div
                        key={post.slug}
                        className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
                      >
                        {isFirstImage ? (
                          <div className="container">
                            <Image
                              src={displayImage}
                              alt={title}
                              width={400}
                              height={225}
                              fetchPriority="high"
                              className="w-full object-cover aspect-video"
                            />
                          </div>
                        ) : (
                          <LazyImage
                            src={displayImage}
                            alt={title}
                            classes="lazy-image w-full object-cover aspect-video"
                          />
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
                            <Link href={`/${path}`}>{title}</Link>
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mt-2">{summary}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
