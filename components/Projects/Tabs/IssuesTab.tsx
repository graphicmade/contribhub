import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleDotIcon, TagIcon } from 'lucide-react';
import { getRepoIssues } from '@/services/utils/github';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Badge } from '@/components/ui/badge';

interface IssuesTabProps {
  owner: string;
  repo: string;
}

interface Issue {
  id: number;
  html_url: string;
  title: string;
  labels: Label[];
}

interface Label {
  id: number;
  name: string;
  color: string;
}

function IssueList({ issues }: { issues: Issue[] }) {
  return (
    <ul className='space-y-4'>
      {issues.map((issue) => (
        <li key={issue.id} className="bg-white rounded-lg nice-shadow p-4">
          <Link href={issue.html_url} target="_blank" rel="noopener noreferrer" className='hover:underline font-medium flex items-center text-gray-800'>
            <CircleDotIcon className="mr-2 h-4 w-4 text-green-500" />
            {issue.title}
          </Link>
          <div className='flex flex-wrap mt-2'>
            {issue.labels.map((label) => (
              <span key={label.id} className='flex items-center text-xs mr-2 mb-1 px-2 py-1 rounded-full' style={{ backgroundColor: `#${label.color}`, color: getContrastColor(label.color) }}>
                <TagIcon className="mr-1 h-3 w-3" />
                {label.name}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

function IssuesTab({ owner, repo }: IssuesTabProps) {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [helpWantedIssues, setHelpWantedIssues] = useState<Issue[]>([]);
  const [goodFirstIssues, setGoodFirstIssues] = useState<Issue[]>([]);
  const [hacktoberfestIssues, setHacktoberfestIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const allIssues = await getRepoIssues(owner, repo);
        // Ensure the fetched issues match our Issue interface
        const typedIssues: Issue[] = allIssues.map((issue: any) => ({
          id: issue.id,
          html_url: issue.html_url,
          title: issue.title,
          labels: issue.labels.map((label: any) => ({
            id: label.id,
            name: label.name,
            color: label.color,
          })),
        }));
        setIssues(typedIssues);

        const helpWanted = typedIssues.filter((issue: Issue) =>
          issue.labels.some((label: Label) => label.name.toLowerCase() === 'help wanted')
        );
        setHelpWantedIssues(helpWanted);

        const goodFirstIssue = typedIssues.filter((issue: Issue) =>
          issue.labels.some((label: Label) => label.name.toLowerCase() === 'good first issue')
        );
        setGoodFirstIssues(goodFirstIssue);

        const hacktoberfest = typedIssues.filter((issue: Issue) =>
          issue.labels.some((label: Label) => label.name.toLowerCase() === 'hacktoberfest')
        );
        setHacktoberfestIssues(hacktoberfest);
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIssues();
  }, [owner, repo]);

  if (isLoading) {
    return (
      <div className='bg-white rounded-lg nice-shadow p-6 mx-auto'>
        <div className="flex justify-between items-center mb-6">
          <Skeleton width={100} height={24} />
          <Skeleton width={200} height={32} />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Skeleton circle width={16} height={16} className="mr-2" />
                <Skeleton width={200} height={20} />
              </div>
              <div className="flex flex-wrap mt-2">
                <Skeleton width={60} height={20} className="mr-2 mb-1" />
                <Skeleton width={80} height={20} className="mr-2 mb-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg nice-shadow p-6 mx-auto'>
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className='text-2xl font-bold text-gray-800'>
            <TabsContent value="all"><Badge counter={issues.length}>Open Issues</Badge></TabsContent>
            <TabsContent value="help-wanted"><Badge counter={helpWantedIssues.length}>Help Wanted Issues</Badge></TabsContent>
            <TabsContent value="good-first-issue"><Badge counter={goodFirstIssues.length}>Good First Issue</Badge></TabsContent>
            <TabsContent value="hacktoberfest"><Badge counter={hacktoberfestIssues.length}>Hacktoberfest</Badge></TabsContent>
          </h2>
          <TabsList className="flex items-center bg-gray-100 rounded-full">
            <TabsTrigger value="all" className="rounded-full px-4 py-1 text-sm font-medium transition-colors focus:outline-none ">
              All Issues
            </TabsTrigger>
            <TabsTrigger value="help-wanted" className="rounded-full px-4 py-1 text-sm font-medium transition-colors focus:outline-none ">
              Help Wanted
            </TabsTrigger>
            <TabsTrigger value="good-first-issue" className="rounded-full px-4 py-1 text-sm font-medium transition-colors focus:outline-none ">
              Good First Issue
            </TabsTrigger>
            <TabsTrigger value="hacktoberfest" className="rounded-full px-4 py-1 text-sm font-medium transition-colors focus:outline-none ">
              Hacktoberfest
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <IssueList issues={issues} />
        </TabsContent>
        <TabsContent value="help-wanted">
          <IssueList issues={helpWantedIssues} />
        </TabsContent>
        <TabsContent value="good-first-issue">
          <IssueList issues={goodFirstIssues} />
        </TabsContent>
        <TabsContent value="hacktoberfest">
          <IssueList issues={hacktoberfestIssues} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper function to determine text color based on background color
function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
}

export default IssuesTab;
