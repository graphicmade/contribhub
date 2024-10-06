import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface AdProps {
  title: string;
  description: string;
  link: string;
  iconBackgroundColor?: string;
  iconContent?: React.ReactNode;
}

function HomeAd({ title, description, link, iconBackgroundColor = 'bg-gray-800', iconContent }: AdProps) {
  return (
    <div className="mb-6 relative">
      <div className='bg-white rounded-lg nice-shadow flex w-80 p-3 text-xs items-center'>
        <div className='flex-shrink-0 mr-3 flex justify-center'>
          <div className={`${iconBackgroundColor} nice-shadow rounded-md w-16 h-16 flex items-center justify-center`}>
            {iconContent}
          </div>
        </div>
        <div className='flex flex-col flex-grow'>
          <Link target="_blank" href={link} className='text-sky-900 hover:underline font-medium mb-0.5'>
            {title}
          </Link>
          <p className='text-gray-700 text-[10px] mb-1'>
            {description}
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