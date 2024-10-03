import SessionProvider from '@/components/Contexts/SessionContext'
import Dashmenu from '@/components/Menus/DashMenu'
import AuthenticatedPage from '@/components/Security/AuthenticatedPage'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'
function DashLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <SessionProvider>
                <Toaster />
                <AuthenticatedPage redirectPath='/login'>
                    <NextTopLoader color="#5472f9" initialPosition={0.3} height={4} easing="ease" speed={500} showSpinner={false} />
                    <div className="flex h-screen bg-gradient-to-b from-[#d7defe] bg-[#F8FAFF] from-2% to-transparent to-20%">
                        <Dashmenu />
                        <main className="flex-1 overflow-auto">
                            {children}
                        </main>
                    </div>
                </AuthenticatedPage>
            </SessionProvider>
        </>
    )
}

export default DashLayout