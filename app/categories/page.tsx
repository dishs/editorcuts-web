import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Popular Video Editing Youtube Categories',
  description: 'Popular Video Editing Youtube Categories',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <div className="relative px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 pb-5">
          <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-8 md:p-12 rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Popular Video Editing Youtube Categories
            </h1>
          </div>
        </div>
        <div className="max-w-xlg">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mb-2 mr-5 mt-2 ml-10">
                <Tag text={t} />
                <Link
                  href={`/categories/${slug(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${t}`}
                >
                  {` (${tagCounts[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
