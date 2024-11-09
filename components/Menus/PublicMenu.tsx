'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import contribhubLogo from '@/public/contribhub.png'
import { Braces, GitBranch, LayoutDashboard, Plus, User, Menu, X } from 'lucide-react'
import { useSession } from '@/components/Contexts/SessionContext'

function PublicMenu() {
   const session = useSession() as any;
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   useEffect(() => {
      console.log(session)
   }, [session])

   return (
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8"
         style={{
            background: `linear-gradient(to bottom, #d7defe 10%, transparent 100%)`,
         }}>
         <Link href="/" className="flex items-center space-x-2">
            <Image width={100} height={40} src={contribhubLogo} alt="logo" className="w-24 sm:w-32 md:w-40" />
            {/*
            <div className="hidden sm:flex ml-2 text-[#183718] text-xs font-medium px-3 py-1 rounded-md items-center nice-shadow space-x-1" style={{ background: 'linear-gradient(to top, #38c831, #51da4b)' }}>
               <GitBranch strokeWidth={3} size={12} className="text-[#183718] animate-pulse" />
               <span>#Hacktoberfest2024</span>
            </div>
            */}
         </Link>

         <div className="flex items-center space-x-3 text-xs">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full right-0 md:top-auto md:right-auto bg-white md:bg-transparent shadow-md md:shadow-none rounded-lg md:rounded-none p-4 md:p-0 space-y-2 md:space-y-0 md:space-x-3 mt-2 md:mt-0`}>
               <Link href="/dashboard/projects/new" className='bg-[#5472f9]/95 text-white space-x-1 backdrop-blur-xl nice-shadow py-1.5 px-3 font-semibold tracking-tight rounded-full flex items-center cursor-pointer'>
                  <Plus size={16} />
                  <span>Submit a Project</span>
               </Link>

               {session.authenticated ? (
                  <>
                     <Link href="/dashboard" className='bg-white text-black space-x-1 backdrop-blur-xl nice-shadow py-1.5 px-3 font-semibold tracking-tight rounded-full flex items-center cursor-pointer'>
                        <LayoutDashboard size={16} />
                        <span>Dashboard</span>
                     </Link>
                     <img
                        src={session.user.user_metadata.avatar_url || '/default-avatar.png'}
                        alt="User Avatar"
                        width={36}
                        height={36}
                        className="rounded-full nice-shadow border-4 border-white"
                     />
                  </>
               ) : (
                  <Link href="/login" className='bg-white text-black space-x-1 backdrop-blur-xl nice-shadow py-1.5 px-3 font-semibold tracking-tight rounded-full flex items-center cursor-pointer'>
                     <User size={16} />
                     <span>Login</span>
                  </Link>
               )}
            </div>
         </div>
      </div>
   )
}

export default PublicMenu
