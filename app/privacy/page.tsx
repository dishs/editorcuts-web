import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '../../data/siteMetadata.js'

const mailTo = `mailto:${siteMetadata.email}`

export const metadata = genPageMetadata({ title: 'Privacy Policy' })
export default function PrivacyPolicy() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="relative px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[2000px] mx-auto">
            <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-8 md:p-12 rounded-3xl p-8 md:p-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Privacy Policy</h1>
            </div>
          </div>
        </section>
        <div className="container px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-md pb-5">Last Updated: 9/28/2023</h2>
          <h2 className="text-xl pb-1 font-bold">Introduction</h2>
          <p className="text-md pb-10">
            EditorCuts is committed to protecting your privacy. This Privacy Policy explains what
            information we collect, how we use it, and your options.
          </p>
          <h2 className="text-xl pb-1 font-bold">Data Collection and Use</h2>
          <p className="text-md pb-10">
            We do not collect any personal data from our visitors. However, our website uses Google
            Analytics to understand our audience better and improve user experience. Google
            Analytics may collect information like your IP address and pages you visit on our site.
          </p>

          <h2 className="text-xl pb-1 font-bold">Data Storage and Security</h2>
          <p className="text-md pb-10">
            Since we do not collect personal information, there is no data to use for any purpose
            other than analyzing web traffic.
          </p>

          <h2 className="text-xl pb-1 font-bold">Third-Party Sharing</h2>
          <p className="text-md pb-10">We do not share any data with third parties.</p>

          <h2 className="text-xl pb-1 font-bold">Security</h2>
          <p className="text-md pb-10">
            The website is a static site with no user data storage capabilities.
          </p>

          <h2 className="text-xl pb-1 font-bold">User Rights</h2>
          <p className="text-md pb-10">
            Since we do not collect personal data, there is no opt-out or data removal process.
          </p>

          <h2 className="text-xl pb-1 font-bold">Minors</h2>
          <p className="text-md pb-10">We do not knowingly collect information from minors.</p>

          <h2 className="text-xl pb-1 font-bold">Changes to this Policy</h2>
          <p className="text-md pb-10">
            We reserve the right to update this Privacy Policy at any time. Changes will be posted
            on this page.
          </p>

          <h2 className="text-xl pb-1 font-bold">Contact Information</h2>
          <p className="text-md pb-10">
            For any queries regarding this Privacy Policy, please contact us at
            <a href={mailTo}>{siteMetadata.email}</a>.
          </p>
        </div>
      </div>
    </>
  )
}
