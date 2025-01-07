import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import Bleed from 'pliny/ui/Bleed'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import LazyIframe from '@/components/LazyIframe'
import Disqus from '@/components/Disqus'
import LazyImage from '@/components/LazyImage'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path, title) =>
  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    siteMetadata.siteUrl
  )}/${path}&text=${encodeURIComponent(`${title}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, images } = content
  const basePath = path.split('/')[0]
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'
  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="xl:pb-6">
            <div className="space-y-1 text-center">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="w-full">
                <div className="aspect-[2/1] w-full relative">
                  <Image
                    fetchPriority="high"
                    src={displayImage}
                    alt={title}
                    style={{ width: '100%' }}
                  />
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    Image copyright Youtube
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] xl:grid xl:grid-cols-4 xl:gap-x-6">
            <dl className="pb-2 pt-2 xl:border-b xl:border-gray-200 xl:pt-11 xl:pb-10 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="pl-5 justify-left">
                  <dl>
                    <div>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base text-lg font-medium leading-6 text-gray-500">
                        Published on{' '}
                        <time dateTime={date}>
                          {new Date(date).toLocaleString(siteMetadata.locale, {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          })}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  {/*
                  {authorDetails.map((author) => (
                    <li key={author.name} className="block">
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="inline-block text-gray-500">By {author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd className="inline-block pl-1">
                          (
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace('https://twitter.com/', '@')}
                            </Link>
                          )}
                          )
                        </dd>
                      </dl>
                    </li>
                  ))}
                  */}
                </ul>
              </dd>
            </dl>
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-5 pl-5 pr-5 dark:prose-invert">
                {children}
              </div>
              {/* 
              <div className="pr-5 pl-5 pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path, title)} rel="nofollow">
                  Discuss on X
                </Link>
              </div>
              */}
              {/* {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
              <Disqus shortname="editorcuts" /> */}
            </div>
            <footer>
              <div className="pr-5 pl-5 divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h4>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h4>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h4>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pr-5 pl-5 pb-5 pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
