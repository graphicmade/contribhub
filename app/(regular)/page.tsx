import DynamicHomeAd from '@/components/Ads/DynamicHomeAd'
import PublicMenu from '@/components/Menus/PublicMenu'
import Projects from '@/components/Projects/Projects'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ContribHubCard from '@/components/Projects/ContribHubProject'

function HomePage() {
  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-5xl flex flex-col items-center px-4 mt-24'>
        <DynamicHomeAd />
        <div className='text-5xl tracking-tighter font-bold text-center w-4/4'>
          The place to find and contribute to open source projects you care about
        </div>
      </div>
      <div className='w-full px-4 mt-12'>
        <Projects />
      </div>
      <div className='w-full max-w-5xl flex flex-col items-center px-4 py-10'>
        <h2 className='text-3xl font-bold mb-2'>Why Contribhub?</h2>
        <p className='text-xl text-gray-600 text-center mb-8'>
          Discover how we're making open source contribution easier and more accessible for everyone
        </p>
        <Link href="/about" className='bg-[#5472f9] text-white px-6 py-3 rounded-full font-semibold flex items-center hover:bg-[#4062e8] transition-colors'>
          About ContribHub
          <ArrowRight className='ml-2' size={20} />
        </Link>
      </div>
      <div className='w-full max-w-5xl flex flex-col items-center px-4 py-10'>
        <h2 className='text-3xl font-bold mb-2'>We're OpenSource</h2>
        <p className='text-xl text-gray-600 text-center mb-8'>
          ContribHub is an open source project. You can find the source code on <a href="https://github.com/graphicmade/contribhub" target="_blank" className="text-[#5472f9] hover:text-[#4062e8]">GitHub</a>.
        </p>
        <ContribHubCard />
      </div>
    </div>
  )
}

export default HomePage
