import React from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleDotIcon, TagIcon } from 'lucide-react';

interface IssuesTabProps {
  issues: Issue[];
  helpWantedIssues: Issue[];
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

function IssuesTab({ issues, helpWantedIssues }: IssuesTabProps) {
  return (
    <div className='bg-white rounded-lg nice-shadow p-6 mx-auto'>
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className='text-2xl font-bold text-gray-800'>
            <TabsContent value="all">Open Issues</TabsContent>
            <TabsContent value="help-wanted">Help Wanted Issues</TabsContent>
          </h2>
          <TabsList className="flex items-center bg-gray-100 rounded-full">
            <TabsTrigger value="all" className="rounded-full px-4 py-1 text-sm font-medium transition-colors focus:outline-none ">
              All Issues
            </TabsTrigger>
            <TabsTrigger value="help-wanted" className="rounded-full px-4 py-1 text-sm font-medium transition-colors focus:outline-none ">
              Help Wanted
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <IssueList issues={issues} />
        </TabsContent>
        <TabsContent value="help-wanted">
          <IssueList issues={helpWantedIssues} />
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