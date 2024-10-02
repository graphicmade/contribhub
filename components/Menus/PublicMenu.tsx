import Link from 'next/link';
import React from 'react'
import Image from 'next/image'
import contribhubLogo from '@/public/contribhub.png'
import { Plus, User } from 'lucide-react'

function PublicMenu() {
   return (
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-8"
         style={{
            background: `linear-gradient(to bottom, #d7defe 10%, transparent 100%)`,
         }}>
         <div className="w-1/4 flex items-center">
            <Image width={180} src={contribhubLogo} alt="logo" />
         </div>


         <div className="w-1/4 flex justify-end items-center space-x-2 text-xs">
           <div className='bg-[#5472f9]/95 text-white backdrop-blur-xl nice-shadow py-1.5 px-4 font-semibold tracking-tight rounded-full flex items-center cursor-pointer'>
              <Plus size={16} className="mr-2" />
              Submit a Project
            </div>

            <Link href="/login" className='bg-white text-black backdrop-blur-xl nice-shadow py-1.5 px-4 font-semibold tracking-tight rounded-full flex items-center cursor-pointer'>
               <User size={16} className="mr-2" />
               Login
            </Link>
         </div>
      </div>
   )
}

export default PublicMenu
