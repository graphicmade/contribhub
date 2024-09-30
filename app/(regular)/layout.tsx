import React from 'react'
import PublicMenu from '@/components/Menus/PublicMenu'
import SessionProvider from '@/components/Contexts/SessionContext'
import { Toaster } from 'react-hot-toast'
function RegularLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SessionProvider>
                <Toaster />
                <PublicMenu />
                {children}
            </SessionProvider>

        </>
    )
}

export default RegularLayout