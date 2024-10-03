'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GitHubLogoIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { createProject } from '@/services/projects'
import toast from 'react-hot-toast'
import { useSession } from '@/components/Contexts/SessionContext'

export const groupOptions = [
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

export const contributionOptions = [
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

function NewProjectPage() {
  const session = useSession() as any;
  const router = useRouter()
  const [projectUrl, setProjectUrl] = useState('')
  const [projectName, setProjectName] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedContributions, setSelectedContributions] = useState<string[]>([])
  const [showAllGroups, setShowAllGroups] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidUrl, setIsValidUrl] = useState(false)

  useEffect(() => {
    const githubUrlRegex = /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-_.]+\/?$/
    setIsValidUrl(githubUrlRegex.test(projectUrl))
  }, [projectUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidUrl) {
      toast.error('Please enter a valid GitHub URL')
      return
    }
    setIsSubmitting(true)

    // Extract github_full_slug from the URL
    const urlParts = projectUrl.split('github.com/')[1]
    const github_full_slug = urlParts ? urlParts.replace(/\/$/, '') : ''

    const projectData = {
      name: projectName,
      github_url: projectUrl,
      groups: selectedGroup,
      contributions: selectedContributions.join(','),
      github_full_slug: github_full_slug,
      paid_bounties: false,
      communities: [],
      issues_count: 0,
      stars_count: 0,
    }
    const loadingToast = toast.loading('Submitting project...')

    try {
      const newProject = await createProject(projectData, session.user.id)
      if (newProject) {
        toast.success('Project submitted successfully!', { id: loadingToast })
        // wait 2s
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push(`/dashboard/projects`)
      } else {
        toast.error('Failed to submit project. Please try again.', { id: loadingToast })
        console.error('Failed to submit project:', newProject)
      }
    } catch (error) {
      console.error('Error submitting project:', error)
      toast.error('An error occurred while submitting the project.', { id: loadingToast })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex flex-col items-center w-full pb-20'>
      <div className='w-full max-w-5xl flex flex-col items-center px-4'>
        <h1 className='text-4xl font-bold mb-8'>Submit a New Project</h1>
        <form onSubmit={handleSubmit} className='w-full space-y-6'>
          <div>
            <label htmlFor='projectName' className='block text-sm font-medium text-gray-700 mb-1'>Project Name</label>
            <input
              type='text'
              id='projectName'
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Project Name'
              required
            />
          </div>

          <div>
            <label htmlFor='projectUrl' className='block text-sm font-medium text-gray-700 mb-1'>GitHub Project URL</label>
            <div className='flex flex-col'>
              <div className='flex'>
                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500'>
                  <GitHubLogoIcon className="h-5 w-5" />
                </span>
                <input
                  type='url'
                  id='projectUrl'
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border ${
                    projectUrl && !isValidUrl ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder='https://github.com/username/repo'
                  required
                />
              </div>
              {projectUrl && !isValidUrl && (
                <p className='mt-1 text-sm text-red-600'>Please enter a valid GitHub URL (e.g., https://github.com/username/repo)</p>
              )}
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Project Group</label>
            <div className='mt-1 grid grid-cols-4 gap-3'>
              {groupOptions.slice(0, showAllGroups ? groupOptions.length : 8).map((option) => (
                <button
                  key={option.id}
                  type='button'
                  onClick={() => setSelectedGroup(option.value)}
                  className={`flex flex-col items-center justify-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium ${selectedGroup === option.value
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
                  className={`flex items-center justify-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium space-x-2 ${selectedContributions.includes(option.value)
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
              disabled={isSubmitting || !isValidUrl}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting || !isValidUrl ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewProjectPage