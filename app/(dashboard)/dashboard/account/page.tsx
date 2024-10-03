'use client'
import React from 'react'
import { useSession } from '@/components/Contexts/SessionContext'
import { User, Trash2 } from 'lucide-react'
import { deleteUserAccount } from '@/services/users'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function AccountEditPage() {
  const session = useSession() as any
  const router = useRouter()

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.')
    if (confirmDelete) {
      const { error } = await deleteUserAccount(session.user.id)
      if (error) {
        toast.error('Failed to delete account')
      } else {
        toast.success('Account deleted successfully')
        router.push('/')
      }
    }
  }

  return (
    <div className='flex flex-col items-center w-full pb-20'>
      <div className='w-full max-w-2xl flex flex-col items-center px-4 mt-24'>
        <h1 className='text-4xl font-bold mb-8'>Account Information</h1>
        <div className='w-full bg-white rounded-lg nice-shadow p-6'>
          <div className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
              <div className='flex items-center'>
                <User size={20} className='text-gray-400 mr-2' />
                <input
                  type='text'
                  id='name'
                  value={session.user?.user_metadata?.full_name || ''}
                  readOnly
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100'
                />
              </div>
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <input
                type='email'
                id='email'
                value={session.user?.email || ''}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100'
              />
              <p className='mt-1 text-sm text-gray-500'>Email is linked to your GitHub account.</p>
            </div>
          </div>

          <div className='mt-12 pt-4 border-t border-gray-200'>
            <button
              onClick={handleDeleteAccount}
              className='flex items-center text-red-600 hover:text-red-800'
            >
              <Trash2 size={20} className='mr-2' />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountEditPage