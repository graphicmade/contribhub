import SessionProvider from '@/components/Contexts/SessionContext'
import AuthenticatedPage from '@/components/Security/AuthenticatedPage'
import React from 'react'
import { Toaster } from 'react-hot-toast'

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
                    {children}
                </AuthenticatedPage>
            </SessionProvider>
        </>
    )
}

export default DashLayout