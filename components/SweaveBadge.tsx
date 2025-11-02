'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

function SweaveBadge() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Link href="https://swve.io" target="_blank" rel="noopener noreferrer">
      <div
        className={`fixed z-50 bottom-4 left-4 flex space-x-1 items-center bg-white/80 backdrop-blur-md rounded-full px-2 pr-2.5 py-1 nice-shadow hover:light-shadow-lg transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        }`}
      >
        <img
          src="https://github.com/swve.png"
          alt="swave's GitHub avatar"
          width={20}
          height={20}
          className="rounded-full p-0.5"
        />
        <span className="text-sm font-medium">Made by Sweave</span>
      </div>
    </Link>
  )
}

export default SweaveBadge