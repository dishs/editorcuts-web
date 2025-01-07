import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="max-w-[2000px] mx-auto relative">{children}</section>
}
