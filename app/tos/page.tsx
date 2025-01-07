import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '../../data/siteMetadata.js'

const mailTo = `mailto:${siteMetadata.email}`

export const metadata = genPageMetadata({ title: 'Terms of Service' })
export default function TermsOfService() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="relative px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[2000px] mx-auto">
            <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-8 md:p-12 rounded-3xl p-8 md:p-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Terms of Service</h1>
            </div>
          </div>
        </section>
        <div className="container px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-md pb-5">Last Updated: 9/28/2023</h2>
          <h2 className="text-xl pb-1 font-bold">Introduction</h2>
          <p className="text-md pb-10">
            Welcome to EditorCuts. These Terms of Service govern your use of our website, which
            provides commentary on YouTube videos related to Video Editing influencers.
          </p>

          <h2 className="text-xl pb-1 font-bold">Acceptance of Terms</h2>
          <p className="text-md pb-10">
            By using our website, you agree to comply with and be bound by these Terms of Service.
          </p>

          <h2 className="text-xl pb-1 font-bold">Service Rules</h2>
          <ul className="text-md pb-10">
            <li className="list-disc ml-3">Do not use our website for any illegal activities.</li>
            <li className="list-disc ml-3">
              Do not attempt to harm or disrupt the website in any way.
            </li>
          </ul>

          <h2 className="text-xl pb-1 font-bold">Content Ownership and Copyright</h2>
          <p className="text-md pb-10">
            The articles and highlight videos are created by us and are our property. We embed
            YouTube videos and display thumbnails that are copyrighted material owned by third
            parties. These are used under the Fair Use doctrine for commentary and educational
            purposes. All rights to these images and videos are owned by YouTube or the respective
            content creators. EditorCuts is not affiliated with the YouTube, or any of the content
            creators that we discuss.
          </p>

          <h2 className="text-xl pb-1 font-bold">YouTube Embeds</h2>
          <p className="text-md pb-10">
            We embed YouTube videos using standard embed codes and provide direct links to the
            videos on YouTube. These embeds are governed by YouTube's Terms of Service and Privacy
            Policy.
          </p>

          <h2 className="text-xl pb-1 font-bold">User-Generated Content</h2>
          <p className="text-md pb-10">We do not accept user-generated content at this time.</p>

          <h2 className="text-xl pb-1 font-bold">Limitations and Disclaimers</h2>
          <p className="text-md pb-10">
            EditorCuts provides commentary on Video Editing YouTube influencers. We are not
            responsible for the content of the YouTube videos that we discuss or link to. We are
            also not responsible for any third-party content that may be accessed through our
            website.
          </p>

          <h2 className="text-xl pb-1 font-bold">Fair Use Disclaimer</h2>
          <p className="text-md pb-10">
            The Daily Handles videos and any other content that includes copyrighted material are
            produced under the Fair Use doctrine. These are meant for commentary and educational
            purposes and not for commercial gain. We do not claim ownership of the original content.
          </p>

          <h2 className="text-xl pb-1 font-bold">Termination</h2>
          <p className="text-md pb-10">
            Since there are no user accounts, there is no termination process.
          </p>

          <h2 className="text-xl pb-1 font-bold">Changes to Terms</h2>
          <p className="text-md pb-10">
            We reserve the right to change these Terms of Service at any time. Changes will be
            posted on this page.
          </p>

          <h2 className="text-xl pb-1 font-bold">Contact Information</h2>
          <p className="text-md pb-10">
            For any queries regarding these Terms of Service, please contact us at
            <a href={mailTo}>{siteMetadata.email}</a>.
          </p>
        </div>
      </div>
    </>
  )
}
