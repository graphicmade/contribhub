'use client'

import { createClient } from '@/services/utils/supabase/client'
import { usePathname } from 'next/navigation'
import React, { useContext, createContext, useEffect, useState } from 'react'

export const SessionContext = createContext({}) as any

function SessionProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClient()
    const [session, setSession] = useState({ authenticated: false, loading: true, user: {}, user_roles: {} })
    const pathname = usePathname()


    async function fetchForSession() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            setSession({ ...session, authenticated: true, loading: false, user: user })
        }
        else {
            setSession({ ...session, authenticated: false, loading: false, user: {} })
        }
    }


    useEffect(() => {
        fetchForSession()
    }, [supabase, pathname])


    if (session && session.loading) {
        return <div></div>
    }

    else if (session && !session.loading) {
        return (
            <SessionContext.Provider value={session}>
                {children}
            </SessionContext.Provider>
        )
    }
}

export function useSession() {
    return useContext(SessionContext)
}

export default SessionProvider