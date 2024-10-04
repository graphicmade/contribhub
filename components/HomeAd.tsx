import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function HomeAd() {
  return (
    <div className="mb-6 relative">
      <div className='bg-white rounded-lg nice-shadow flex w-80 p-3 text-xs'>
        <div className='flex-shrink-0 mr-3'>
          <div className='bg-gray-800 nice-shadow rounded-md w-16 h-16 flex items-center justify-center'></div>
        </div>
        <div className='flex flex-col flex-grow'>
          <Link target="_blank" href="https://learnhouse.app" className='text-sky-900 hover:underline font-medium mb-0.5'>
            LearnHouse - Launch world-class courses for your community
          </Link>
          <p className='text-gray-700 text-[10px] mb-1 '>
            The next-gen open source learning platform engineered for simplicity and performance.
          </p>
        </div>
      </div>
      <Link href="/advertise" className='absolute right-0 -mr-[64px] top-1 transform rotate-90 origin-top-left text-gray-400 hover:underline text-[11px]'>
        Advertise
      </Link>
    </div>
  )
}

export default HomeAd