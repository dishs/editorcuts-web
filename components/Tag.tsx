import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

// Capitalize the first letter of each word in the tag
function capitalizeFirstLetter(str: string): string {
  let result = str
    .split(/[\s-]+/) // Split by spaces and hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  // replace double spaces with single spaces
  result = result.replace(/\s{2,}/g, ' ')
  return result
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/categories/${slug(text)}`}
      className="mr-3 mb-3 text-lg bg-gray-800 px-2 py-1 rounded font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {capitalizeFirstLetter(text)}
    </Link>
  )
}

export default Tag
