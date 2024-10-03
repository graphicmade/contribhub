'use client'
import Link from 'next/link';
import React, { useEffect } from 'react'
import Image from 'next/image'
import contribhubLogo from '@/public/contribhub.png'
import { Braces, GitBranch, LayoutDashboard, Plus, User } from 'lucide-react'
import { useSession } from '@/components/Contexts/SessionContext'

function PublicMenu() {
   const session = useSession() as any;

   useEffect(() => {
      console.log(session)
   }, [session])

   return (
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-8"
         style={{
            background: `linear-gradient(to bottom, #d7defe 10%, transparent 100%)`,
         }}>
         <div className="w-3/4 flex items-center  space-x-2">
            <Image width={150} src={contribhubLogo} alt="logo" />
            <div className="ml-2 text-[#183718] text-xs font-medium px-3 py-1 rounded-md flex items-center nice-shadow space-x-1" style={{ background: 'linear-gradient(to top, #38c831, #51da4b)' }}>
               <GitBranch strokeWidth={3} size={12} className="text-[#183718] animate-pulse" />
               <span>#Hacktoberfest2024</span>
            </div>
         </div>

         <div className="w-1/4 flex justify-end items-center space-x-3 text-xs">
           <div className='bg-[#5472f9]/95 text-white space-x-1 backdrop-blur-xl nice-shadow py-1.5 px-3 font-semibold tracking-tight rounded-full flex items-center cursor-pointer'>
              <Plus size={16}  />
             <span>Submit a Project</span>
            </div>

            {session.authenticated ? (
               <>
                 <Link href="/dashboard" className='bg-white text-black space-x-1 backdrop-blur-xl nice-shadow py-1.5 px-3 font-semibold tracking-tight rounded-full flex items-center cursor-pointer'>
                    <LayoutDashboard size={16}  />
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
                  <User size={16}  />
                  <span>Login</span>
               </Link>
            )}
         </div>
      </div>
   )
}

export default PublicMenu
