import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-8 md:p-12">
        <div className="container mx-auto px-4 py-10 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{children}</h1>
        </div>
      </div>
    </>
  )
}
