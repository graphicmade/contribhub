import HomeAd from '@/components/HomeAd'
import PublicMenu from '@/components/Menus/PublicMenu'
import Projects from '@/components/Projects/Projects'
import Sponsors from '@/components/Sponsors'
import React from 'react'

function HomePage() {
  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-5xl flex flex-col items-center px-4 mt-24'>
        <HomeAd />
        <div className='text-5xl tracking-tighter font-bold text-center w-4/4'>
          The place to find and contribute to open source projects you care about
        </div>
      </div>
      <div className='w-full px-4 mt-12'>
        <Projects />
      </div>
      <div className='flex flex-col w-full  py-5'>
        <h3 className='text-2xl font-bold justify-center mx-auto '>Sponsors</h3>
        <Sponsors />
      </div>
    </div>
  )
}

export default HomePage
