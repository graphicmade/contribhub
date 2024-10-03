import React, { useEffect, useState } from 'react';
import { getRepoContributorFile } from '@/services/utils/github';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface ContributorTabProps {
  owner: string;
  repo: string;
}

function ContributorTab({ owner, repo }: ContributorTabProps) {
  const [contributorContent, setContributorContent] = useState<string>('');

  useEffect(() => {
    async function fetchContributorFile() {
      try {
        const content = await getRepoContributorFile(owner, repo);
        setContributorContent(content);
      } catch (error) {
        console.error('Error fetching contributor file:', error);
        setContributorContent('No CONTRIBUTING.md file found in this repository.');
      }
    }

    fetchContributorFile();
  }, [owner, repo]);

  return (
    <div className='bg-white rounded-lg nice-shadow p-6'>
      <h2 className='text-xl font-semibold mb-4'>Contributor Guidelines</h2>
      <MarkdownPreview
        className='p-5'
        wrapperElement={{
          "data-color-mode": "light"
        }}
        source={contributorContent}
      />
    </div>
  );
}

export default ContributorTab;