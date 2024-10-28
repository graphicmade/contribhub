'use client'
import React, { useState, useEffect, useRef } from 'react'
import { List, Tags, ChevronDown, CircleDot, Group, Code, GitBranch, X } from 'lucide-react'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { getProjectsByMultipleFilters, Project } from '@/services/projects/projects'
import Link from 'next/link'
import { contributionOptions, languagesOptions, groupOptions } from '@/services/projects/utils'

type Option = {
  id: string;
  value: string;
  label: string;
  icon: string;
}

interface SelectedFilterProps {
  id: string;
  toggle: () => void;
  group?: Option[];
}

function SelectedFilter({id, toggle, group}: SelectedFilterProps): React.ReactElement {
  let name = id.charAt(0).toUpperCase() + id.substring(1)
  if (group) {
    const option = group.find((option: Option) => option.id === id) || { id: '', value: '', label: '', icon: '' }
    name = option.icon + " " + option.label
  }
  return (
    <button
      key={id}
      className='flex items-center p-1 px-2 my-1 bg-[#5472f910] border border-[#5472f970] mr-2 rounded text-sm text-gray-800 cursor-pointer'
      onClick={() => toggle()}
      >{name}
      <X size={14} className="ml-1.5 text-gray-800" />
    </button>
  )
}

interface ProjectsProps {
  initialGroups?: string[];
  initialContributions?: string[];
  initialLanguages?: string[]; // Added this line
  initialStars?: [number, number] | null;
  showFindBar?: boolean;
  initialHacktoberfest?: boolean;
}

function Projects({
  initialGroups = [],
  initialContributions = [],
  initialLanguages = [], // Added this line
  initialStars = null,
  showFindBar = true,
  initialHacktoberfest = false,
}: ProjectsProps) {
  const [selectedGroups, setSelectedGroups] = useState<string[]>(initialGroups)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialContributions)
  const randomSeed: number = Math.floor(Date.now() / (1000 * 60 * 60)) // Generates a unique number every hour

  const [isGroupsOpen, setIsGroupsOpen] = useState(false)
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

  const [isHacktoberfest, setIsHacktoberfest] = useState<boolean>(initialHacktoberfest)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
        setIsGroupsOpen(false);
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
    setSelectedGroups(prev =>
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
    const matchesGroups = selectedGroups.length === 0 || project.groups?.split(',').some(tag => selectedGroups.includes(tag.toLowerCase())) || false;
    const matchesStars = starFilter === null || ((project.stars_count ?? 0) >= starFilter[0] && (project.stars_count ?? 0) <= starFilter[1]);
    return matchesGroups && (starFilter === null || matchesStars);
  });

  const fetchProjects = async () => {
    const selectedGroup = selectedGroups.join(',')
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
      randomSeed.toString(),
      isHacktoberfest
    )
    setProjects(fetchedProjects)
    setTotalCount(totalCount)
  }

  useEffect(() => {
    fetchProjects()
  }, [selectedGroups, selectedTypes, selectedLanguages, searchQuery, page, pageSize, starFilter, isHacktoberfest])

  return (
    <div className="flex flex-col w-full pb-20">
      <div className="flex flex-col w-full justify-center items-center">
        {showFindBar && (
          <div className='flex flex-col gap-1.5 mb-5'>
            {/* Search bar */}
            <div className="bg-white light-shadow rounded-3xl h-auto p-3 w-full flex flex-col items-center gap-2 pr-4">
              <input
                type="text"
                placeholder="Search projects..."
                className="rounded-full px-3 py-1.5 border border-gray-100/100 bg-gray-50 w-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {/* Groups dropdown */}
                <div className="relative" ref={tagsRef}>
                  <button
                    onClick={() => {setIsGroupsOpen(!isGroupsOpen)}}
                    className={`flex items-center border hover:border-[#5472f9] hover:text-gray-600 rounded-full px-3 py-1.5 whitespace-nowrap w-auto text-gray-500 font-medium text-sm ${ selectedGroups.length && " bg-[#5472f920] border-[#5472f9] text-gray-600" } transition-all ease-linear duration-300`}
                    style={
                      isGroupsOpen
                        ? {
                            borderColor: "#5472f9",
                            backgroundColor: "#5472f910",
                            color: "#4B5563",
                          }
                        : {}
                    }
                  >
                    <Group size={14} className="mr-1.5 text-gray-500" />
                    Groups
                    <ChevronDown size={14} className="ml-1.5 text-gray-500" />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 bg-white rounded-lg nice-shadow p-2 z-10 transition-all duration-300 ease-in-out max-h-60 overflow-y-auto min-w-max ${
                      isGroupsOpen
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {groupOptions.map((tag) => (
                      <label
                        key={tag.id}
                        className={"flex items-center p-2 hover:bg-[#5472f920] border-white border-2 rounded-md cursor-pointer" + (selectedGroups.includes(tag.id) ? " bg-[#5472f920]" : "")}
                      >
                        <input
                          type="checkbox"
                          checked={selectedGroups.includes(tag.id)}
                          onChange={() => toggleTag(tag.id)}
                          className="mr-2"
                          tabIndex={isGroupsOpen ? 0 : -1}
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
                    className={`flex items-center border hover:border-[#5472f9] hover:text-gray-600 rounded-full px-3 py-1.5 whitespace-nowrap w-auto text-gray-500 font-medium text-sm ${ selectedTypes.length && " bg-[#5472f920] border-[#5472f9] text-gray-600" } transition-all ease-linear duration-300`}
                    style={
                      isTypesOpen
                        ? {
                            borderColor: "#5472f9",
                            backgroundColor: "#5472f910",
                            color: "#4B5563",
                          }
                        : {}
                    }
                  >
                    <CircleDot size={14} className="mr-1.5 text-gray-500" />
                    Contributions
                    <ChevronDown size={14} className="ml-1.5 text-gray-500" />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 bg-white rounded-lg nice-shadow p-2 z-10 transition-all duration-300 ease-in-out max-h-60 overflow-y-auto min-w-max ${
                      isTypesOpen
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {contributionOptions.map((type) => (
                      <label
                        key={type.id}
                        className={"flex items-center p-2 hover:bg-[#5472f920] border-white border-2 rounded-md cursor-pointer" + (selectedTypes.includes(type.id) ? " bg-[#5472f920]" : "")}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type.id)}
                          onChange={() => toggleType(type.id)}
                          className="mr-2"
                          tabIndex={isTypesOpen ? 0 : -1}
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
                    className={`flex items-center border hover:border-[#5472f9] hover:text-gray-600 rounded-full px-3 py-1.5 whitespace-nowrap w-auto text-gray-500 font-medium text-sm ${ starFilter && " bg-[#5472f920] border-[#5472f9] text-gray-600" } transition-all ease-linear duration-300`}
                    style={
                      isStarsOpen
                        ? {
                            borderColor: "#5472f9",
                            backgroundColor: "#5472f910",
                            color: "#4B5563",
                          }
                        : {}
                    }
                  >
                    <StarFilledIcon className="mr-1.5 text-gray-500" />
                    Stars:{" "}
                    {starFilter
                      ? `${starFilter[0]}-${
                          starFilter[1] === Infinity ? "∞" : starFilter[1]
                        }`
                      : "All"}
                    <ChevronDown size={14} className="ml-1.5 text-gray-500" />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 bg-white rounded-lg nice-shadow p-2 z-10 transition-all duration-300 ease-in-out min-w-max ${
                      isStarsOpen
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {starOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => {
                          setStarFilter(option.value as [number, number] | null);
                          setIsStarsOpen(false);
                        }}
                        className={`block w-full text-left p-2 hover:bg-[#5472f920] border-white border-2 rounded-md ${
                          JSON.stringify(starFilter) ===
                          JSON.stringify(option.value)
                            ? "bg-[#5472f920]"
                            : ""
                        }`}
                        tabIndex={isStarsOpen ? 0 : -1}
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
                    className={`flex items-center border hover:border-[#5472f9] hover:text-gray-600 rounded-full px-3 py-1.5 whitespace-nowrap w-auto text-gray-500 font-medium text-sm ${ selectedLanguages.length && " bg-[#5472f920] border-[#5472f9] text-gray-600" } transition-all ease-linear duration-300`}
                    style={
                      isLanguagesOpen
                        ? {
                            borderColor: "#5472f9",
                            backgroundColor: "#5472f910",
                            color: "#4B5563",
                          }
                        : {}
                    }
                  >
                    <Code size={14} className="mr-1.5 text-gray-500" />
                    Languages
                    <ChevronDown size={14} className="ml-1.5 text-gray-500" />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 bg-white rounded-lg nice-shadow p-2 z-10 transition-all duration-300 ease-in-out max-h-60 overflow-y-auto min-w-max ${
                      isLanguagesOpen
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {languagesOptions.map((language) => (
                      <label
                        key={language.id}
                        className={"flex items-center p-2 hover:bg-[#5472f920] border-white border-2 rounded-md cursor-pointer" + (selectedLanguages.includes(language.id) ? " bg-[#5472f920]" : "")}
                      >
                        <input
                          type="checkbox"
                          checked={selectedLanguages.includes(language.id)}
                          onChange={() => toggleLanguage(language.id)}
                          className="mr-2"
                          tabIndex={isLanguagesOpen ? 0 : -1}
                        />
                        {language.icon} {language.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Hacktoberfest filter button */}
                <button
                  onClick={() => setIsHacktoberfest(!isHacktoberfest)}
                  className={`flex items-center border border-[#38c831] hover:bg-[#ecffea] hover:text-gray-600 rounded-full px-3 py-1.5 whitespace-nowrap w-auto font-medium text-sm ${
                    isHacktoberfest ? "text-[#183718]" : "text-gray-500"
                  } transition-all ease-linear duration-300`}
                  style={
                    isHacktoberfest
                      ? {
                          background: "linear-gradient(to top, #38c831, #51da4b)",
                        }
                      : {}
                  }
                >
                  <GitBranch
                    size={14}
                    className={`mr-1.5 ${
                      isHacktoberfest ? "text-[#183718]" : "text-gray-500"
                    }`}
                  />
                  Hacktoberfest
                </button>
              </div>
            </div>

            {/* Selected filters */}
            <div className='flex flex-wrap px-1 max-w-prose'>
              {/* Filters by dropdowns */}
              {selectedGroups.map((group) => (
                <SelectedFilter key={group} id={group} toggle={() => toggleTag(group)} group={groupOptions} />
              ))}
              {selectedTypes.map((type) => (
                <SelectedFilter key={type} id={type} toggle={() => toggleType(type)} group={contributionOptions} />
              ))}
              {starFilter &&
                <SelectedFilter
                  id={`Stars: ${starFilter[0]}-${starFilter[1] === Infinity ? "∞" : starFilter[1]}`}
                  toggle={() => setStarFilter(null)}
                />
              }
              {selectedLanguages.map((language) => (
                <SelectedFilter key={language} id={language} toggle={() => toggleLanguage(language)} group={languagesOptions} />
              ))}
              {isHacktoberfest && (
                <SelectedFilter id='hacktoberfest' toggle={() => setIsHacktoberfest(false)} />
              )}

              {/* Clear all */}
              {(selectedGroups.length > 0 || selectedTypes.length > 0 || starFilter || selectedLanguages.length > 0 || isHacktoberfest) && (
                <button
                  className='text-gray-600 text-sm underline hover:no-underline hover:text-[#5472f9]'
                  onClick={() => {
                    setSelectedGroups([])
                    setSelectedTypes([])
                    setStarFilter(null)
                    setSelectedLanguages([])
                    setIsHacktoberfest(false)
                  }}
                  >Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Project list */}
        <div className="w-full grid grid-cols-1 max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.project_uuid}`}
              key={project.id}
              className="bg-white rounded-lg p-4 nice-shadow w-full h-48 flex flex-col"
            >
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-gray-200 rounded-md mr-2 flex-shrink-0">
                  {project.icon_image && (
                    <img
                      src={project.icon_image}
                      className="rounded-md"
                      width={24}
                      height={24}
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold truncate">
                  {project.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-2 flex-grow overflow-hidden text-ellipsis text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 items-center">
                {project.groups
                  ?.split(",")
                  .slice(0, 2)
                  .map((group) => (
                    <span
                      key={group}
                      className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full text-xs"
                    >
                      {group}
                    </span>
                  ))}
                <span className="ml-auto text-gray-500 text-sm flex items-center space-x-1">
                  <StarFilledIcon className="text-gray-500" />
                  <span className="text-gray-500">{project.stars_count}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {Math.ceil(totalCount / pageSize)}
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= Math.ceil(totalCount / pageSize)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Projects
