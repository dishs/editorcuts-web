'use client'

import { useRef, useEffect, useState } from 'react'

const LazyIframe = ({ url, title }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const lockRef = useRef(false)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const currentContainerRef = containerRef.current
    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]
      setIsIntersecting(isIntersecting)
    })

    if (currentContainerRef) {
      observer.observe(currentContainerRef)
    }
    return () => {
      if (currentContainerRef) {
        observer.unobserve(currentContainerRef)
      }
    }
  }, [])

  if (isIntersecting) {
    lockRef.current = true
  }

  return (
    <div
      style={{
        overflow: 'hidden',
        paddingTop: '56.25%',
        position: 'relative',
        width: '100%',
      }}
      ref={containerRef}
    >
      {lockRef.current && (
        <iframe
          title={title}
          style={{
            bottom: 0,
            height: '100%',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
            width: '100%',
          }}
          src={url}
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  )
}

export default LazyIframe
