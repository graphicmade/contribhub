import { Metadata } from 'next'
import { getProjectByUuid } from '@/services/projects/projects'
import ClientProjectPage from './client'
import { getRepoInfo, getRepoReadme, getRepoContributors, getRepoLanguages } from '@/services/utils/github'

export const dynamic = 'force-dynamic'

type MetadataProps = {
  params: Promise<{ projectuuid: string }>
}

export async function generateMetadata(props: MetadataProps): Promise<Metadata> {
  const params = await props.params;
  const project = await getProjectByUuid(params.projectuuid)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.github_full_slug} - Project Details`,
    description: project.description || `Details for ${project.github_full_slug}`,
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    openGraph: {
      title: `${project.github_full_slug} - Project Details`,
      description: project.description || `Details for ${project.github_full_slug}`,
      type: 'website',
      url: `https://contribhub.com/projects/${project.project_uuid}`,
      images: [
        {
          url: project.icon_image || '',
          width: 400,
          height: 400,
          alt: project.github_full_slug || '',
        },
      ],
    },
  }
}

export default async function ProjectPage(props: { params: Promise<{ projectuuid: string }> }) {
  const params = await props.params;
  const project = await getProjectByUuid(params.projectuuid)

  if (!project) {
    return <div>Project not found</div>
  }

  const [owner, repo] = project.github_full_slug?.split('/') || []

  // Fetch all data on server side
  const [repoInfo, readme, contributors, languages] = await Promise.all([
    getRepoInfo(owner, repo),
    getRepoReadme(owner, repo),
    getRepoContributors(owner, repo),
    getRepoLanguages(owner, repo)
  ])

  return <ClientProjectPage 
    project={project}
    initialRepoInfo={repoInfo}
    initialReadme={readme}
    initialContributors={contributors}
    initialLanguages={Object.keys(languages)}
  />
}
