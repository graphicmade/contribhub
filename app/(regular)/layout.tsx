import React from 'react'
import PublicMenu from '@/components/Menus/PublicMenu'
import SessionProvider from '@/components/Contexts/SessionContext'
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'
import Footer from '@/components/Footer'
import SweaveBadge from '@/components/SweaveBadge'
import ScrollToTop from '@/components/ScrollToTop'
function RegularLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SessionProvider>
                <NextTopLoader color="#5472f9" initialPosition={0.3} height={4} easing="ease" speed={500} showSpinner={false} />
                <Toaster />
                <PublicMenu />
                <SweaveBadge/>
                {children}
                <Footer />
                <ScrollToTop />
            </SessionProvider>

        </>
    )
}

export default RegularLayout