'use client'

import { useState } from 'react'
import siteMetadata from '../../data/siteMetadata.js'

export default function Contact() {
  const [formData, setFormData] = useState({
    site: `${siteMetadata.owner}.com`,
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleClick = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const res = await fetch(
          'https://2401g83wz9.execute-api.us-east-1.amazonaws.com/production/sendEmail',
          {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              site: formData.site,
              email: formData.email,
              subject: formData.subject,
              name: formData.name,
              message: formData.message,
            }),
          }
        )
        console.log('res:', res)
        if (res.status === 200) {
          setSuccessMessage('Email sent successfully')
          setErrorMessage('')
        }
      } catch (error) {
        setErrorMessage('Failed to send email')
        console.log('Failed to send email', error)
      }
    }
  }

  const validateForm = () => {
    const { name, email, subject, message } = formData
    if (!name || !email || !subject || !message) {
      setErrorMessage('Please fill out all fields')
      return false
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address')
      return false
    }
    return true
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="relative px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[2000px] mx-auto">
            <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-8 md:p-12 rounded-3xl p-8 md:p-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Get In Touch With Us
              </h1>
              <p className="text-white/90 max-w-2xl">
                Have any feedback for the team? Want to reach out for advertising? Fill out the form
                below and we'll be in touch!
              </p>
            </div>
          </div>
        </section>
        <div className="container text-black px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <div className="p-1">
              <h1 className="text-2xl mb-4">Contact Us</h1>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}
              <form>
                <input type="hidden" name="site" value={formData.site} />
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="p-2 w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    className="p-2 w-full"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="p-2 w-full"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    name="message"
                    placeholder="Your message"
                    className="p-2 w-full h-32"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2" onClick={handleClick}>
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
