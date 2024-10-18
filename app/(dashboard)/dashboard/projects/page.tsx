'use client'

import React, { useEffect, useState } from 'react'
import { getProjectsByUserId, Project } from '@/services/projects/projects'
import { useSession } from '@/components/Contexts/SessionContext'
import { StarFilledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Plus } from 'lucide-react';

function MyProjectsPage() {
  const session = useSession() as any;
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      if (session?.user?.id) {
        const fetchedProjects = await getProjectsByUserId(session.user.id);
        setProjects(fetchedProjects);
      }
    }
    fetchProjects();
  }, [session]);

  return (
    <div className='flex flex-col w-full pb-20'>
      <div className='flex flex-col w-full justify-center items-center'>
        <div className='w-full max-w-7xl flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold'>My Projects</h1>
          <Link href="/dashboard/projects/new" className='bg-[#5472f9]/95 text-white space-x-1 backdrop-blur-xl nice-shadow py-2 px-4 font-semibold tracking-tight rounded-full flex items-center cursor-pointer'>
            <Plus size={16} />
            <span>Submit a Project</span>
          </Link>
        </div>
        <div className='w-full grid grid-cols-1 max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {projects.length === 0 && (
          <div className='flex flex-col items-center justify-center space-y-4 mt-8'>
            <p className='text-gray-500'>You haven't submitted any projects yet.</p>
            <Link href="/dashboard/projects/new" className='bg-[#5472f9]/95 text-white space-x-1 backdrop-blur-xl nice-shadow py-2 px-4 font-semibold tracking-tight rounded-full flex items-center cursor-pointer'>
              <Plus size={16} />
              <span>Submit a Project</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className='bg-white rounded-lg p-4 nice-shadow w-full h-48 flex flex-col'>
      <div className='flex items-center mb-2 justify-between'>
        <div className='flex items-center overflow-hidden mr-2'>
          <div className='w-6 h-6 bg-gray-200 rounded-md mr-2 flex-shrink-0'></div>
          <Link href={`/projects/${project.project_uuid}`} className='flex-grow'>
            <h3 className='text-lg font-semibold truncate'>{project.name}</h3>
          </Link>
        </div>
        <Link href={`/dashboard/projects/${project.project_uuid}/edit`} className='text-blue-500 hover:text-blue-700 whitespace-nowrap'>
          Edit
        </Link>
      </div>
      <Link href={`/projects/${project.project_uuid}`} className='flex-grow'>
        <p className='text-gray-600 mb-2 overflow-hidden text-ellipsis text-sm'>
          {project.description}
        </p>
      </Link>
      <div className='flex flex-wrap gap-1 items-center'>
        {project.groups?.split(',').slice(0, 2).map(group => (
          <span key={group} className='bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full text-xs'>
            {group}
          </span>
        ))}
        <span className='ml-auto text-gray-500 text-sm flex items-center space-x-1'>
          <StarFilledIcon className="text-gray-500" /> 
          <span className='text-gray-500'>{project.stars_count}</span>
        </span>
      </div>
    </div>
  )
}

export default MyProjectsPage