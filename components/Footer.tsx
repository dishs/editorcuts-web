import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import footerNavLinks from '@/data/footerNavLinks'

export default async function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-wrap items-center justify-center">
        {footerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="p-5 font-medium text-gray-900 dark:text-gray-100"
            >
              {link.title}
            </Link>
          ))}
      </div>

      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          {/* <SocialIcon kind="tiktok" href={siteMetadata.tiktok} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} /> */}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
