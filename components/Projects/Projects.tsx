'use client'
import React, { useState, useEffect, useRef } from 'react'
import { List, Tags, ChevronDown, CircleDot, Group } from 'lucide-react'
import { StarFilledIcon } from '@radix-ui/react-icons'

interface Project {
  id: number
  name: string
  description: string
  tags: string[]
  stars: number // Add this line
}

interface Option {
  id: string
  value: string
  label: string
  icon: string
}

function Projects() {
  const projects: Project[] = [
    { id: 1, name: 'Project A', description: 'A cool React-based frontend project', tags: ['Frontend', 'React'], stars: 120 },
    { id: 2, name: 'Project B', description: 'An awesome Node.js backend API', tags: ['Backend', 'Node.js'], stars: 85 },
    { id: 3, name: 'Project C', description: 'Full stack e-commerce application', tags: ['Fullstack', 'React', 'Express'], stars: 250 },
    { id: 4, name: 'Project D', description: 'Mobile app for task management', tags: ['Mobile', 'React Native'], stars: 180 },
    { id: 5, name: 'Project E', description: 'Machine learning model for image recognition', tags: ['AI', 'Python', 'TensorFlow'], stars: 320 },
    { id: 6, name: 'Project F', description: 'Blockchain-based voting system', tags: ['Blockchain', 'Solidity', 'Ethereum'], stars: 150 },
    { id: 7, name: 'Project G', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 400 },
    { id: 8, name: 'Project H', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 380 },
    { id: 9, name: 'Project I', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 290 },
    { id: 10, name: 'Project J', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 310 },
    { id: 11, name: 'Project K', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 270 },
    { id: 12, name: 'Project L', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 350 },
    { id: 13, name: 'Project M', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 300 },
    { id: 14, name: 'Project N', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 280 },
    { id: 15, name: 'Project O', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 330 },
    { id: 16, name: 'Project P', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 260 },
    { id: 17, name: 'Project Q', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 370 },
    { id: 18, name: 'Project R', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 230 },
    { id: 19, name: 'Project S', description: 'Cloud-native microservices architecture', tags: ['Microservices', 'Docker', 'Kubernetes'], stars: 390 },
  ]

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const tagOptions: Option[] = [
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

  const typeOptions: Option[] = [
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

  const [isTagsOpen, setIsTagsOpen] = useState(false)
  const [isTypesOpen, setIsTypesOpen] = useState(false)

  const tagsRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);

  const [starFilter, setStarFilter] = useState<[number, number] | null>(null)
  const [isStarsOpen, setIsStarsOpen] = useState(false)

  const starsRef = useRef<HTMLDivElement>(null)

  const starOptions = [
    { value: null, label: 'All' },
    { value: [0, 50], label: '0-50' },
    { value: [51, 100], label: '51-100' },
    { value: [101, 500], label: '101-500' },
    { value: [501, 1000], label: '501-1000' },
    { value: [1001, Infinity], label: '1000+' },
  ]

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

  const filteredProjects = projects.filter(project => {
    const matchesTags = selectedTags.length === 0 || project.tags.some(tag => selectedTags.includes(tag.toLowerCase()));
    const matchesStars = starFilter === null || (project.stars >= starFilter[0] && project.stars <= starFilter[1]);
    return matchesTags && matchesStars;
  });

  return (
    <div className='flex flex-col w-full pb-20'>
      <div className='flex flex-col w-full justify-center items-center'>
        <div className='bg-white light-shadow rounded-full h-auto max-w-5xl p-4 w-full flex flex-wrap items-center gap-3 pr-5 mb-6'>
          <input
            type="text"
            placeholder="Search projects..."
            className='rounded-full px-4 py-2 border border-gray-100/100 bg-gray-50 flex-grow'
          />

          {/* Tags dropdown */}
          <div className="relative" ref={tagsRef}>
            <button
              onClick={() => setIsTagsOpen(!isTagsOpen)}
              className="flex items-center  nice-shadow rounded-full px-4 py-2 whitespace-nowrap w-auto text-gray-500 font-medium"
            >
              <Group size={16} className="mr-2 text-gray-500" />
              Groups
              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </button>
            <div className={`absolute top-full left-0 mt-2 bg-white rounded-lg nice-shadow p-2 z-10 transition-all duration-300 ease-in-out max-h-60 overflow-y-auto ${isTagsOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
              {tagOptions.map(tag => (
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
              className="flex items-center  nice-shadow rounded-full px-4 py-2 whitespace-nowrap w-auto text-gray-500 font-medium"
            >
              <CircleDot size={16} className="mr-2 text-gray-500" />
              Contributions
              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </button>
            <div className={`absolute top-full left-0 mt-2 bg-white rounded-lg nice-shadow p-2 z-10 transition-all duration-300 ease-in-out max-h-60 overflow-y-auto ${isTypesOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
              {typeOptions.map(type => (
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
              className="flex items-center nice-shadow rounded-full px-4 py-2 whitespace-nowrap w-auto text-gray-500 font-medium"
            >
              <StarFilledIcon className="mr-2 text-gray-500" />
              Stars: {starFilter ? `${starFilter[0]}-${starFilter[1] === Infinity ? '∞' : starFilter[1]}` : 'All'}
              <ChevronDown size={16} className="ml-2 text-gray-500" />
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
        </div>

        {/* Project list */}
        <div className='w-full grid grid-cols-1 max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10'>
          {filteredProjects.map(project => (
            <div key={project.id} className='bg-white rounded-lg p-4 nice-shadow w-full h-48 flex flex-col'>
              <div className='flex items-center mb-2'>
                <div className='w-6 h-6 bg-gray-200 rounded-md mr-2 flex-shrink-0'></div>
                <h3 className='text-lg font-semibold truncate'>{project.name}</h3>
              </div>
              <p className='text-gray-600 mb-2 flex-grow overflow-hidden text-ellipsis text-sm'>
                {project.description}
              </p>
              <div className='flex flex-wrap gap-1 items-center'>
                {project.tags.slice(0, 2).map(tag => (
                  <span key={tag} className='bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full text-xs'>
                    {tag}
                  </span>
                ))}
                <span className='ml-auto text-gray-500 text-sm flex items-center space-x-1'>
                  <StarFilledIcon className=" text-gray-500" /> 
                  <span className='text-gray-500'>{project.stars}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects