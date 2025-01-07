'use client'

import React, { useEffect, useCallback } from 'react'

interface Window {
  disqus_config?: (...args: string[]) => void
  DISQUS?: {
    reset?: (options: { reload: boolean }) => void
  }
}

const Disqus = ({ shortname }) => {
  const COMMENTS_ID = 'disqus_thread'

  const loadComments = useCallback(() => {
    window.disqus_config = function () {
      this.page.url = window.location.href // Replace with your page's canonical URL
      this.page.identifier = window.location.href // Replace with your page's unique identifier
    }

    if (window.DISQUS === undefined) {
      const script = document.createElement('script')
      script.src = `https://${shortname}.disqus.com/embed.js`
      script.setAttribute('data-timestamp', new Date().toString())
      script.async = true
      document.body.appendChild(script)
    } else {
      // @ts-ignore
      window.DISQUS?.reset?.({ reload: true })
    }
  }, [shortname])

  useEffect(() => {
    loadComments()
  }, [loadComments])

  return (
    <div className="disqus-frame" id={COMMENTS_ID}>
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  )
}

export default Disqus
