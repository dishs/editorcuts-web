import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

function capitalizeFirstLetter(str) {
  // Capitalize first letter and convert space to dash
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({
  params,
}: {
  params: { categories: string }
}): Promise<Metadata> {
  const tag = decodeURI(params.categories)
  return genPageMetadata({
    title: `${capitalizeFirstLetter(tag)} Youtube News & Videos`,
    description: `${capitalizeFirstLetter(tag)} Youtube News, Videos, & Commentary`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/categories/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    categories: tag,
  }))
  return paths
}

export default function TagPage({ params }: { params: { categories: string } }) {
  const tag = decodeURI(params.categories)
  // Capitalize first letter and convert space to dash
  const title = `${capitalizeFirstLetter(tag)} Youtube News & Videos`
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  return <ListLayout posts={filteredPosts} title={title} tags={capitalizeFirstLetter(tag)} />
}
