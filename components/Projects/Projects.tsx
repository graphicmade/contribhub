'use client'
import React, { useState, useEffect, useRef } from 'react'
import { List, Tags, ChevronDown, CircleDot, Group, Code } from 'lucide-react'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { getProjectsByMultipleFilters, Project } from '@/services/projects/projects'
import Link from 'next/link'
import { contributionOptions, languagesOptions, groupOptions } from '@/services/projects/utils'

interface ProjectsProps {
  initialGroups?: string[];
  initialContributions?: string[];
  initialLanguages?: string[]; // Added this line
  initialStars?: [number, number] | null;
  showFindBar?: boolean;
}

function Projects({
  initialGroups = [],
  initialContributions = [],
  initialLanguages = [], // Added this line
  initialStars = null,
  showFindBar = true
}: ProjectsProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(initialGroups)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialContributions)
  const randomSeed: number = Math.floor(Math.random() * 1000000); // Generates a random integer

  const [isTagsOpen, setIsTagsOpen] = useState(false)
  const [isTypesOpen, setIsTypesOpen] = useState(false)

  const tagsRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);

  const [starFilter, setStarFilter] = useState<[number, number] | null>(initialStars)
  const [isStarsOpen, setIsStarsOpen] = useState(false)

  const starsRef = useRef<HTMLDivElement>(null)

  const starOptions = [
    { value: null, label: 'All' },
    { value: [0, 50], label: '0-50' },
    { value: [51, 100], label: '51-100' },
    { value: [101, 500], label: '101-500' },
    { value: [501, 1000], label: '501-1000' },
    { value: [1001, 2000], label: '1001-2000' },
    { value: [2001, 5000], label: '2001-5000' },
    { value: [5001, Infinity], label: '5001-∞' },
  ]

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [searchQuery, setSearchQuery] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(initialLanguages) // Updated this line
  const [isLanguagesOpen, setIsLanguagesOpen] = useState(false)
  const languagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
        setIsTagsOpen(false);
      }
      if (typesRef.current && !typesRef.current.contains(event.target as Node)) {
        setIsTypesOpen(false);
      }
      if (starsRef.current && !starsRef.current.contains(event.target as Node)) {
        setIsStarsOpen(false);
      }
      if (languagesRef.current && !languagesRef.current.contains(event.target as Node)) {
        setIsLanguagesOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    )
  }

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]
    )
  }

  const toggleLanguage = (languageId: string) => {
    setSelectedLanguages(prev =>
      prev.includes(languageId) ? prev.filter(id => id !== languageId) : [...prev, languageId]
    )
  }

  const filteredProjects = projects.filter(project => {
    const matchesTags = selectedTags.length === 0 || project.groups?.split(',').some(tag => selectedTags.includes(tag.toLowerCase())) || false;
    const matchesStars = starFilter === null || ((project.stars_count ?? 0) >= starFilter[0] && (project.stars_count ?? 0) <= starFilter[1]);
    return matchesTags && (starFilter === null || matchesStars);
  });

  const fetchProjects = async () => {
    const selectedGroup = selectedTags.join(',')
    const selectedContributions = selectedTypes.join(',')
    const selectedLanguage = selectedLanguages.join(',')
    const { projects: fetchedProjects, totalCount } = await getProjectsByMultipleFilters(
      selectedGroup,
      selectedContributions,
      searchQuery,
      page,
      pageSize,
      starFilter ? starFilter[0] : undefined,
      starFilter ? starFilter[1] : undefined,
      selectedLanguage,
      randomSeed.toString()
    )
    setProjects(fetchedProjects)
    setTotalCount(totalCount)
  }

  useEffect(() => {
    fetchProjects()
  }, [selectedTags, selectedTypes, selectedLanguages, searchQuery, page, pageSize, starFilter])

  return (
    <div className='flex flex-col w-full pb-20'>
      <div className='flex flex-col w-full justify-center items-center'>
        {showFindBar && (
          <div className='findbar bg-white light-shadow rounded-full h-auto max-w-4xl p-3 w-full flex flex-wrap items-center gap-2 pr-4 mb-5'>
            <input
              type="text"
              placeholder="Search projects..."
              className='rounded-full px-3 py-1.5 border border-gray-100/100 bg-gray-50 flex-grow text-sm'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Tags dropdown */}
            <div className="relative" ref={tagsRef}>
              <button
                onClick={() => setIsTagsOpen(!isTagsOpen)}
                className="flex items-center nice-shadow rounded-full px-3 py-1.5 whitespace-nowrap w-auto text-gray-500 font-medium text-sm"
              >
                <Group size={14} className="mr-1.5 text-gray-500" />
                Groups
                <ChevronDown size={14} className="ml-1.5 text-gray-500" />
              </button>
              <div className={`absolute top-full left-0 mt-2 bg-white rounded-lg nice-shadow p-2 z-10 transition-all duration-300 ease-in-out max-h-60 overflow-y-auto ${isTagsOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {groupOptions.map(tag => (
                  <label key={tag.id} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => toggleTag(tag.id)}
                      className="mr-2"
                    />
                    {tag.icon} {tag.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Types dropdown */}
            <div className="relative" ref={typesRef}>
              <button
                onClick={() => setIsTypesOpen(!isTypesOpen)}
                className="flex items-center nice-shadow rounded-full px-3 py-1.5 whitespace-nowrap w-auto text-gray-500 font-medium text-sm"
              >
                <CircleDot size={14} className="mr-1.5 text-gray-500" />
                Contributions
                <ChevronDown size={14} className="ml-1.5 text-gray-500" />
              </button>
              <div className={`absolute top-full left-0 mt-2 bg-white rounded-lg nice-shadow p-2 z-10 transition-all duration-300 ease-in-out max-h-60 overflow-y-auto ${isTypesOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {contributionOptions.map(type => (
                  <label key={type.id} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.id)}
                      onChange={() => toggleType(type.id)}
                      className="mr-2"
                    />
                    {type.icon} {type.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Stars dropdown */}
            <div className="relative" ref={starsRef}>
              <button
                onClick={() => setIsStarsOpen(!isStarsOpen)}
                className="flex items-center nice-shadow rounded-full px-3 py-1.5 whitespace-nowrap w-auto text-gray-500 font-medium text-sm"
              >
                <StarFilledIcon className="mr-1.5 text-gray-500" />
                Stars: {starFilter ? `${starFilter[0]}-${starFilter[1] === Infinity ? '∞' : starFilter[1]}` : 'All'}
                <ChevronDown size={14} className="ml-1.5 text-gray-500" />
              </button>
              <div className={`absolute top-full left-0 mt-2 bg-white rounded-lg nice-shadow p-2 z-10 transition-all duration-300 ease-in-out ${isStarsOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {starOptions.map(option => (
                  <button
                    key={option.label}
                    onClick={() => {
                      setStarFilter(option.value as [number, number] | null);
                      setIsStarsOpen(false);
                    }}
                    className={`block w-full text-left p-2 hover:bg-gray-100 rounded ${JSON.stringify(starFilter) === JSON.stringify(option.value) ? 'bg-gray-100' : ''}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Languages dropdown */}
            <div className="relative" ref={languagesRef}>
              <button
                onClick={() => setIsLanguagesOpen(!isLanguagesOpen)}
                className="flex items-center nice-shadow rounded-full px-3 py-1.5 whitespace-nowrap w-auto text-gray-500 font-medium text-sm"
              >
                <Code size={14} className="mr-1.5 text-gray-500" />
                Languages
                <ChevronDown size={14} className="ml-1.5 text-gray-500" />
              </button>
              <div className={`absolute top-full left-0 mt-2 bg-white rounded-lg nice-shadow p-2 z-10 transition-all duration-300 ease-in-out max-h-60 overflow-y-auto ${isLanguagesOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {languagesOptions.map(language => (
                  <label key={language.id} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(language.id)}
                      onChange={() => toggleLanguage(language.id)}
                      className="mr-2"
                    />
                    {language.icon} {language.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Project list */}
        <div className='w-full grid grid-cols-1 max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10'>
          {projects.map(project => (
            <Link href={`/projects/${project.project_uuid}`} key={project.id} className='bg-white rounded-lg p-4 nice-shadow w-full h-48 flex flex-col'>
              <div className='flex items-center mb-2'>
                <div className='w-6 h-6 bg-gray-200 rounded-md mr-2 flex-shrink-0'>
                  {project.icon_image && (
                    <img
                      src={project.icon_image}
                      className='rounded-md'
                      width={24}
                      height={24}
                    />
                  )}
                </div>
                <h3 className='text-lg font-semibold truncate'>{project.name}</h3>
              </div>
              <p className='text-gray-600 mb-2 flex-grow overflow-hidden text-ellipsis text-sm'>
                {project.description}
              </p>
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
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {Math.ceil(totalCount / pageSize)}
          </span>
          <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={page >= Math.ceil(totalCount / pageSize)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Projects