import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
// import TestAuto from './TestAuto'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  // return <TestAuto />
}
