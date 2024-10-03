'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { GitHubLogoIcon, ImageIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Group, CircleDot, Upload } from 'lucide-react'
import Image from 'next/image'

function NewProjectPage() {
  const router = useRouter()
  const [projectUrl, setProjectUrl] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedContributions, setSelectedContributions] = useState<string[]>([])
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [icon, setIcon] = useState<string | null>(null)
  const [showAllGroups, setShowAllGroups] = useState(false)
  
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const iconInputRef = useRef<HTMLInputElement>(null)

  const groupOptions = [
    { id: 'education', value: 'education', label: 'Education', icon: '🎓' },
    { id: 'finance', value: 'finance', label: 'Finance', icon: '💰' },
    { id: 'healthcare', value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { id: 'ecommerce', value: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { id: 'social_media', value: 'social_media', label: 'Social Media', icon: '📱' },
    { id: 'gaming', value: 'gaming', label: 'Gaming', icon: '🎮' },
    { id: 'productivity', value: 'productivity', label: 'Productivity', icon: '⏱️' },
    { id: 'travel', value: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'food_delivery', value: 'food_delivery', label: 'Food Delivery', icon: '🍔' },
    { id: 'real_estate', value: 'real_estate', label: 'Real Estate', icon: '🏠' },
    { id: 'fitness', value: 'fitness', label: 'Fitness', icon: '💪' },
    { id: 'entertainment', value: 'entertainment', label: 'Entertainment', icon: '🎭' },
    { id: 'news_media', value: 'news_media', label: 'News & Media', icon: '📰' },
    { id: 'transportation', value: 'transportation', label: 'Transportation', icon: '🚗' },
    { id: 'environment', value: 'environment', label: 'Environment', icon: '🌿' },
    { id: 'iot', value: 'iot', label: 'IoT', icon: '🔌' },
    { id: 'cybersecurity', value: 'cybersecurity', label: 'Cybersecurity', icon: '🔒' },
    { id: 'ar_vr', value: 'ar_vr', label: 'AR/VR', icon: '🥽' },
    { id: 'music', value: 'music', label: 'Music', icon: '🎵' },
    { id: 'nonprofit', value: 'nonprofit', label: 'Non-profit', icon: '🤝' },
    { id: 'marketing', value: 'marketing', label: 'Marketing', icon: '📣' },
    { id: 'ai', value: 'ai', label: 'AI', icon: '🤖' }
  ]

  const contributionOptions = [
    { id: 'docs', value: 'docs', label: 'Documentation', icon: '📚' },
    { id: 'features', value: 'features', label: 'Features', icon: '✨' },
    { id: 'ui_design', value: 'ui_design', label: 'UI Design', icon: '🎨' },
    { id: 'optimization', value: 'optimization', label: 'Optimization', icon: '⚡' },
    { id: 'testing', value: 'testing', label: 'Testing', icon: '🧪' },
    { id: 'localization', value: 'localization', label: 'Localization', icon: '🌐' },
    { id: 'reviews', value: 'reviews', label: 'Code Reviews', icon: '👀' },
    { id: 'bugs', value: 'bugs', label: 'Bug Finding', icon: '🐛' },
    { id: 'automating', value: 'automating', label: 'Automating', icon: '🤖' },
    { id: 'community', value: 'community', label: 'Community Management', icon: '👥' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ projectUrl, projectName, projectDescription, selectedGroup, selectedContributions, thumbnail, icon })
    // After submission, redirect to the dashboard or a success page
    router.push('/dashboard')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: (value: string | null) => void) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='flex flex-col items-center w-full pb-20'>
      <div className='w-full max-w-5xl flex flex-col items-center px-4 mt-24'>
        <h1 className='text-4xl font-bold mb-8'>Submit a New Project</h1>
        <form onSubmit={handleSubmit} className='w-full space-y-6'>
          <div className='relative w-full h-64 bg-white rounded-lg overflow-hidden nice-shadow'>
            {thumbnail ? (
              <Image src={thumbnail} alt="Project thumbnail" layout="fill" objectFit="cover" />
            ) : (
              <div className='flex items-center justify-center h-full'>
                <ImageIcon className='w-12 h-12 text-gray-400' />
              </div>
            )}
            <div className='absolute bottom-4 left-4 flex items-end space-x-4'>
              <div className='relative w-20 h-20 bg-gray-100 rounded-full overflow-hidden nice-shadow border-4 border-white'>
                {icon ? (
                  <Image src={icon} alt="Project icon" layout="fill" objectFit="cover" />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <ImageIcon className='w-8 h-8 text-gray-400' />
                  </div>
                )}
                <button
                  type='button'
                  onClick={() => iconInputRef.current?.click()}
                  className='absolute bottom-0 right-0 bg-white text-gray-700 p-1.5 rounded-full nice-shadow hover:bg-gray-50'
                >
                  <Upload className='w-3 h-3' />
                </button>
                <input
                  ref={iconInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => handleFileUpload(e, setIcon)}
                />
              </div>
              <input
                type='text'
                id='projectName'
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className='mt-1 block w-64 px-3 py-2 bg-white bg-opacity-80 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                placeholder='Project Name'
                required
              />
            </div>
            <button
              type='button'
              onClick={() => thumbnailInputRef.current?.click()}
              className='absolute bottom-4 right-4 bg-white text-gray-700 py-2 px-4 rounded-full nice-shadow hover:bg-gray-50'
            >
              <Upload className='w-4 h-4 mr-2 inline-block' />
              Upload Cover
            </button>
            <input
              ref={thumbnailInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(e) => handleFileUpload(e, setThumbnail)}
            />
          </div>

          <div>
            <label htmlFor='projectUrl' className='block text-sm font-medium text-gray-700 mb-1'>GitHub Project URL</label>
            <div className='flex'>
              <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500'>
                <GitHubLogoIcon className="h-5 w-5" />
              </span>
              <input
                type='url'
                id='projectUrl'
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                className='flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                placeholder='https://github.com/username/repo'
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor='projectDescription' className='block text-sm font-medium text-gray-700 mb-1'>Project Description</label>
            <textarea
              id='projectDescription'
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={3}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Project Group</label>
            <div className='mt-1 grid grid-cols-4 gap-3'>
              {groupOptions.slice(0, showAllGroups ? groupOptions.length : 8).map((option) => (
                <button
                  key={option.id}
                  type='button'
                  onClick={() => setSelectedGroup(option.value)}
                  className={`flex flex-col items-center justify-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium ${
                    selectedGroup === option.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            {groupOptions.length > 8 && (
              <button
                type='button'
                onClick={() => setShowAllGroups(!showAllGroups)}
                className='mt-3 flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
              >
                {showAllGroups ? (
                  <>
                    Show Less <ChevronUpIcon className='ml-2 h-5 w-5' />
                  </>
                ) : (
                  <>
                    Show More <ChevronDownIcon className='ml-2 h-5 w-5' />
                  </>
                )}
              </button>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Expected Contributions</label>
            <div className='mt-1 grid grid-cols-4 gap-3'>
              {contributionOptions.map((option) => (
                <button
                  key={option.id}
                  type='button'
                  onClick={() => setSelectedContributions(prev =>
                    prev.includes(option.value)
                      ? prev.filter(v => v !== option.value)
                      : [...prev, option.value]
                  )}
                  className={`flex items-center justify-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium space-x-2 ${
                    selectedContributions.includes(option.value)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Submit Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewProjectPage