import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from '@/components/Image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={siteMetadata.siteLogo} alt={siteMetadata.title} height={50} width={50} />
              {typeof siteMetadata.headerTitle === 'string' ? (
                <span className="text-xl md:text-3xl font-bold uppercase">
                  {siteMetadata.headerTitle}
                </span>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6 pr-5">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden sm:block font-medium text-gray-900 dark:text-gray-100"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        {/* <ThemeSwitch /> */}
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
