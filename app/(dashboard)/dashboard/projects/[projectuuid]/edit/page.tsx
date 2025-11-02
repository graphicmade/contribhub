'use client'

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation'
import { GitHubLogoIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { updateProject, deleteProject, getProjectByUuid } from '@/services/projects/projects'
import toast from 'react-hot-toast'
import { contributionOptions, groupOptions } from '@/services/projects/utils'

function EditProjectPage(props: { params: Promise<{ projectuuid: string }> }) {
  const params = use(props.params);
  const router = useRouter()
  const [projectId, setProjectId] = useState<number | undefined>(undefined)
  const [projectUrl, setProjectUrl] = useState('')
  const [projectName, setProjectName] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedContributions, setSelectedContributions] = useState<string[]>([])
  const [showAllGroups, setShowAllGroups] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidUrl, setIsValidUrl] = useState(false)

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectData = await getProjectByUuid(params.projectuuid)
        if (projectData) {
          setProjectId(Number(projectData.id))
          setProjectUrl(projectData.github_url || '')
          setProjectName(projectData.name || '')
          setSelectedGroup(projectData.groups || '')
          setSelectedContributions(projectData.contributions?.split(',') || [])
        }
      } catch (error) {
        console.error('Error fetching project data:', error)
        toast.error('Failed to load project data')
      }
    }

    fetchProjectData()
  }, [params.projectuuid])

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

    const urlParts = projectUrl?.split('github.com/')[1]
    const github_full_slug = urlParts ? urlParts.replace(/\/$/, '') : ''

    const projectData = {
      name: projectName,
      github_url: projectUrl,
      groups: selectedGroup,
      contributions: selectedContributions.join(','),
      github_full_slug,
    }
    const loadingToast = toast.loading('Updating project...')

    try {
      if (projectId) {
        const updatedProject = await updateProject(Number(projectId), projectData)
        if (updatedProject) {
          toast.success('Project updated successfully!', { id: loadingToast })
          await new Promise(resolve => setTimeout(resolve, 2000))
          router.push(`/dashboard/projects`)
        }
      }
    } catch (error) {
      console.error('Error updating project:', error)
      toast.error('An error occurred while updating the project.', { id: loadingToast })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      const loadingToast = toast.loading('Deleting project...')
      try {
        await deleteProject(Number(projectId))
        toast.success('Project deleted successfully!', { id: loadingToast })
        router.push('/dashboard/projects')
      } catch (error) {
        console.error('Error deleting project:', error)
        toast.error('Failed to delete project. Please try again.', { id: loadingToast })
      }
    }
  }

  return (
    <div className='flex flex-col items-center w-full pb-20'>
      <div className='w-full max-w-5xl flex flex-col items-center px-4'>
        <h1 className='text-4xl font-bold mb-8'>Edit Project</h1>
        <form onSubmit={handleSubmit} className='w-full space-y-6'>
          <div>
            <label htmlFor='projectName' className='block text-sm font-medium text-gray-700 mb-1'>Project Name</label>
            <input
              type='text'
              id='projectName'
              defaultValue={projectName}
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
                  defaultValue={projectUrl}
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

          <div className='flex justify-between'>
            <button
              type='submit'
              disabled={isSubmitting || !isValidUrl}
              className={`flex-1 mr-2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting || !isValidUrl ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isSubmitting ? 'Updating...' : 'Update Project'}
            </button>
            <button
              type='button'
              onClick={handleDelete}
              className='flex-1 ml-2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              Delete Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProjectPage
