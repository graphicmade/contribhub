'use client'
import { getUri } from '@/services/utils'
import { createClient } from '@/services/utils/supabase/client'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React from 'react'

function SignWithGitHubButton({ redirectTo }: { redirectTo: string }) {
    const supabase = createClient()
    const router = useRouter()

    async function signInWithGithub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: 'http://localhost:3002' }
        })
        if (error) {
            console.error(error)
            return
        }
        if (data) {
            console.log(data)
            //router.push('/dashboard')
        }
    }

    return (
        <button 
            className='flex items-center justify-center w-full bg-black px-4 py-2 rounded-full font-semibold nice-shadow hover:light-shadow-lg text-white'
            onClick={signInWithGithub}
        >
            <GitHubLogoIcon className="h-5 w-5 mr-2" />
            Login with GitHub
        </button>
    )
}

export default SignWithGitHubButton