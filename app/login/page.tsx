"use client"
import Image from 'next/image'
import SignWithGitHubButton from '@/components/Security/SigninButtons/SignWithGitHubButton'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import contribhublogo from "@/public/contribhub.png"

export default function LoginPage() {
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirectTo') || '/dashboard'
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#d7defe] from-2% to-transparent to-20%">
            <div className="p-8 bg-white rounded-lg nice-shadow w-full max-w-md">
                <div className="flex flex-col items-center">
                    <Link href={'/'} >
                        <Image src={contribhublogo} alt="Contribhub Logo" width={200}  className="mb-6" /></Link>
                    <div className="space-y-4 w-full">
                        <SignWithGitHubButton redirectTo={redirectTo} />
                    </div>
                    <p className="mt-4 text-sm rounded-full text-center text-gray-600">
                        Sign in or create an account with GitHub
                    </p>
                </div>
            </div>
        </div>
    )
}