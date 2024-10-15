'use client';

import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from 'next/image';
import hacktoberfestLogo from '@/public/hacktoberfest.svg';
import { useRouter } from 'next/navigation';
import { getProjectByUuid, Project, syncProjectWithGitHub } from '@/services/projects/projects';
import { getRepoInfo, getRepoReadme, getRepoContributors, getRepoLanguages } from '@/services/utils/github';
import { InfoCircledIcon, GitHubLogoIcon, PersonIcon, StarFilledIcon } from '@radix-ui/react-icons';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IssuesTab from '@/components/Projects/Tabs/IssuesTab';
import ContributorTab from '@/components/Projects/Tabs/ContributorTab';
import { BookOpenIcon } from 'lucide-react';
import ShareButton from '@/components/ShareButton';

function ClientProjectPage({ project }: { project: Project }) {
    const [repoInfo, setRepoInfo] = useState<any>(null);
    const [readme, setReadme] = useState<string>('');
    const [contributors, setContributors] = useState<any[]>([]);
    const [owner, setOwner] = useState<string>('');
    const [repo, setRepo] = useState<string>('');
    const [isReadmeLoading, setIsReadmeLoading] = useState(true);
    const [isContributorsLoading, setIsContributorsLoading] = useState(true);
    const [languages, setLanguages] = useState<string[]>([]);
    const [isLanguagesLoading, setIsLanguagesLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchProjectData() {
            if (project) {
                // Extract owner and repo from github_full_slug
                const [owner, repo] = project.github_full_slug?.split('/') || [];
                setOwner(owner);
                setRepo(repo);
                if (owner && repo) {
                    await Promise.all([
                        fetchRepoInfo(owner, repo),
                        fetchReadme(owner, repo),
                        fetchContributors(owner, repo)
                    ]);

                    // Sync project with GitHub as the last operation
                    await syncProjectWithGitHub(Number(project.id));
                }
            } else {
                router.push('/404');
            }
        }

        fetchProjectData();
    }, [project, router]);

    const fetchRepoInfo = async (owner: string, repo: string) => {
        const repoInfoData = await getRepoInfo(owner, repo);
        setRepoInfo(repoInfoData);

        const languagesData = await getRepoLanguages(owner, repo);
        setLanguages(Object.keys(languagesData));
        setIsLanguagesLoading(false);
    };

    const fetchReadme = async (owner: string, repo: string) => {
        const readmeData = await getRepoReadme(owner, repo);
        setReadme(readmeData);
        setIsReadmeLoading(false);
    };

    const fetchContributors = async (owner: string, repo: string) => {
        const contributorsData = await getRepoContributors(owner, repo);
        setContributors(contributorsData);
        setIsContributorsLoading(false);
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col w-full pb-20 mt-16 sm:mt-24 md:mt-32'>
            <div className='w-full max-w-7xl mx-auto px-4'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8'>
                    <div className='flex items-center mb-4 sm:mb-0 '>
                        {repoInfo && (
                            <>
                                <img
                                    src={repoInfo.owner.avatar_url}
                                    alt={`${repoInfo.owner.login}'s avatar`}
                                    className='w-8 h-8 sm:w-10 sm:h-10 rounded-lg mr-3 sm:mr-4'
                                />
                                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold break-all'>{project.github_full_slug}</h1>
                            </>
                        )}
                    </div>
                    <div className='flex items-center space-x-4'>
                        {repoInfo && (
                            <>
                                <span className='flex items-center'>
                                    <StarFilledIcon className="text-yellow-400 mr-1" />
                                    {repoInfo.stargazers_count}
                                </span>
                                <ShareButton uuid={project?.project_uuid || ''} github_full_slug={project?.github_full_slug || ''} />
                                <Link href={project.github_url || '#'} target="_blank" rel="noopener noreferrer" className='flex items-center bg-black text-white px-3 py-1 rounded-md'>
                                    <GitHubLogoIcon className="mr-2" />
                                    View on GitHub
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <Tabs defaultValue="about" className="w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-0'>
                            <TabsContent value="about">About</TabsContent>
                            <TabsContent value="issues">Issues</TabsContent>
                            <TabsContent value="contributor">Contributors Guidelines</TabsContent>
                        </h2>
                        <TabsList className="flex items-center shadow-inner/50 bg-slate-200/70 rounded-full p-1">
                            <TabsTrigger value="about" className="flex items-center px-4 py-1 text-sm font-medium transition-colors focus:outline-none  rounded-full">
                                <InfoCircledIcon className="w-4 h-4 mr-2" />
                                About
                            </TabsTrigger>
                            <TabsTrigger value="issues" className="flex items-center px-4 py-1 text-sm font-medium transition-colors focus:outline-none  rounded-full">
                                <GitHubLogoIcon className="w-4 h-4 mr-2" />
                                Issues
                            </TabsTrigger>
                            <TabsTrigger value="contributor" className="flex items-center px-4 py-1 text-sm font-medium transition-colors focus:outline-none  rounded-full">
                                <BookOpenIcon className="w-4 h-4 mr-2" />
                                Guidelines
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="about">
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                            <div className='col-span-1 md:col-span-2'>
                                <div className='bg-white rounded-lg nice-shadow p-6 mb-8'>
                                    <p className=''>{repoInfo?.description}</p>
                                </div>

                                <div className='bg-white rounded-lg nice-shadow p-6'>
                                    <h2 className='text-xl font-semibold mb-4'>README</h2>
                                    {isReadmeLoading ? (
                                        <Skeleton count={10} />
                                    ) : (
                                        <MarkdownPreview
                                            className='p-5'
                                            wrapperElement={{
                                                "data-color-mode": "light"
                                            }}
                                            source={readme}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className='col-span-1'>
                                {project.hacktoberfest && (
                                    <div className='bg-white rounded-lg nice-shadow p-6 mb-8' style={{ background: 'linear-gradient(to top, #38c831, #51da4b)' }}>
                                    <div className="flex flex-col text-[#183718] justify-center items-center space-y-4">
                                        <Image className='w-32' src={hacktoberfestLogo} alt='Hacktoberfest' />
                                        <h1 className='text-lg font-bold mb-4 uppercase'>Participating project</h1>
                                        </div>
                                    </div>
                                )}
                                <div className='bg-white rounded-lg nice-shadow p-6 mb-8'>
                                    <h2 className='text-xl font-semibold mb-4'>Contributors</h2>
                                    <div className='flex flex-wrap'>
                                        {isContributorsLoading ? (
                                            Array(10).fill(0).map((_, index) => (
                                                <Skeleton key={index} circle={true} width={40} height={40} className='mr-2 mb-2' />
                                            ))
                                        ) : (
                                            contributors.slice(0, 10).map((contributor) => (
                                                <img
                                                    key={contributor.id}
                                                    src={contributor.avatar_url}
                                                    alt={contributor.login}
                                                    className='w-10 h-10 rounded-full mr-2 mb-2'
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className='bg-white rounded-lg nice-shadow p-6 mb-8'>
                                    <h2 className='text-xl font-semibold mb-4'>Project Group</h2>
                                    <div className='flex flex-wrap gap-2'>
                                        {project.groups?.split(',').map((group, index) => (
                                            <span key={index} className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm'>
                                                {group.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className='bg-white rounded-lg nice-shadow p-6 mb-8'>
                                    <h2 className='text-xl font-semibold mb-4'>Languages</h2>
                                    <div className='flex flex-wrap gap-2'>
                                        {isLanguagesLoading ? (
                                            Array(3).fill(0).map((_, index) => (
                                                <Skeleton key={index} width={60} height={24} className='rounded-full' />
                                            ))
                                        ) : (
                                            languages.map((language, index) => (
                                                <span key={index} className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm'>
                                                    {language}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className='bg-white rounded-lg nice-shadow p-6 mb-8'>
                                    <h2 className='text-xl font-semibold mb-4'>Looking for Contributions</h2>
                                    <div className='flex flex-wrap gap-2'>
                                        {project.contributions?.split(',').map((contribution, index) => (
                                            <span key={index} className='bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm'>
                                                {contribution.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="issues">
                        <IssuesTab owner={owner} repo={repo} />
                    </TabsContent>

                    <TabsContent value="contributor">
                        <ContributorTab owner={owner} repo={repo} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default ClientProjectPage;
