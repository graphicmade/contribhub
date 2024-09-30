import Link from 'next/link';
import React from 'react'

function PublicMenu() {
   return (
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-8"
         style={{
            background: `linear-gradient(to bottom, #d7defe 30%, transparent 100%)`,
         }}>
         <div className="w-1/4 flex items-center">
            Logo
         </div>

         <nav className="flex items-center bg-white/95 backdrop-blur-xl light-shadow p-4 px-8 font-semibold tracking-tight rounded-full justify-between w-3/4">
            Something
         </nav>



         <div className="w-1/4 flex justify-end items-center space-x-4">
            something else
         </div>
      </div>
   )
}

export default PublicMenu
