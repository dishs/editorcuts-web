import slugify from 'slugify'
import { slug } from 'github-slugger'

export const sanitizeSlug = (title: string): string => {
  // let cleaned = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g }) // Removes special characters including periods
  let cleaned = slug(title)
  cleaned = cleaned.replace(/ /g, '-') // Replaces spaces with hyphens

  // Remove '--' occurrences
  while (cleaned.includes('--')) {
    cleaned = cleaned.replace('--', '-')
  }

  return cleaned
}
