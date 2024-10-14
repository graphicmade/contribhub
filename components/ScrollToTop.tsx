'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className='fixed bottom-4 right-4 z-50 cursor-pointer bg-[#5472f9] hover:bg-[#4062e8] text-white border-none rounded-md w-10 h-10'
        >
          ↑
        </Button>
      )}
    </>
  )
}

export default ScrollToTop
