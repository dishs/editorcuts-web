'use client'

import { useEffect } from 'react'

const LazyImage = ({ src, alt, classes }) => {
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            if (entry.target.hasAttribute('data-src')) {
              const src = entry.target.getAttribute('data-src')
              if (src !== null) {
                entry.target.setAttribute('src', src)
              }
              observer.unobserve(entry.target)
            }
          }
        })
      })
      document.querySelectorAll('.lazy-image').forEach((gameImg) => {
        if (
          gameImg.getAttribute('is-observed') != 'true' &&
          gameImg.getAttribute('data-src') != null
        ) {
          gameImg.setAttribute('is-observed', 'true')
          observer.observe(gameImg)
        }
      })
    } else {
      const imgList = document.querySelectorAll('.lazy-image')
      Array.prototype.forEach.call(imgList, function (image) {
        image.setAttribute('src', image.getAttribute('data-src'))
      })
    }
  })
  return (
    <>
      <img
        data-src={src}
        alt={alt}
        className={classes}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      />
    </>
  )
}

export default LazyImage
