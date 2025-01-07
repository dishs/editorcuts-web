import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="relative px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[2000px] mx-auto">
            <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-8 md:p-12 rounded-3xl p-8 md:p-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About EditorCuts</h1>
            </div>
          </div>
        </section>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0 px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {/* {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )} */}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
