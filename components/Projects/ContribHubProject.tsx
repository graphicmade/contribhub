import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import contribhubLogo from '@/public/ch_icon.png'

function ContribHubCard() {
  return (
    <div className='nice-shadow rounded-md p-4 mb-6 bg-white'>
      <div className='flex items-center mb-4'>
        <img
          src="/ch_icon.png"
          alt="ContribHub Logo"
          className='w-10 h-10 mr-4'
          width={40}
          height={40}
        />
        <div>
          <h3 className='text-xl font-semibold'>
            <Link href="https://github.com/graphicmade/contribhub" className="text-[#0969da] hover:underline">
              graphicmade / contribhub
            </Link>
          </h3>
          <p className='text-sm text-gray-600 mt-1'>
            The place to find and contribute to open source projects you care about
          </p>
        </div>
      </div>
      <div className='flex items-center space-x-4 mt-4 justify-center'>
        <Link href="https://github.com/graphicmade/contribhub/stargazers" 
              className='flex items-center text-gray-600 hover:text-blue-600 text-sm border border-gray-300 rounded-md px-3 py-1 transition-colors duration-200 ease-in-out hover:bg-gray-100'>
          <StarIcon className="mr-1" />
          <span>Star</span>
        </Link>
        <Link href="https://github.com/graphicmade/contribhub" 
              className='flex items-center text-gray-600 hover:text-blue-600 text-sm border border-gray-300 rounded-md px-3 py-1 transition-colors duration-200 ease-in-out hover:bg-gray-100'>
          <GitHubLogoIcon className="mr-1" />
          <span>View on GitHub</span>
        </Link>
        <Link href="projects/5888b344-0fbb-48a7-9d47-2a42e02c7326" 
              className='flex items-center text-white bg-[#5472f9] hover:bg-[#4062e8] text-sm rounded-md px-3 py-1 transition-colors duration-200 ease-in-out'>
          <Image
            src={contribhubLogo}
            alt="ContribHub Logo"
            width={16}
            height={16}
            className="mr-1 filter grayscale brightness-200"
          />
          <span>View on ContribHub</span>
        </Link>
      </div>
    </div>
  )
}

export default ContribHubCard