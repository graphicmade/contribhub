"use server"
import { Octokit } from "@octokit/rest";

// Initialize Octokit with your GitHub App's authentication
const octokit = new Octokit({
  auth: process.env.GITHUB_APP_TOKEN,
});

// Get repositories that the user is an owner of
export async function getUserRepositories(username: string) {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      type: 'owner',
      sort: 'updated',
      per_page: 100,
    });
    return data;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    throw error;
  }
}

// Get information about a specific repository
export async function getRepoInfo(owner: string, repo: string) {
  try {
    const { data } = await octokit.repos.get({
      owner,
      repo,
    });
    return data;
  } catch (error) {
    console.error('Error fetching repo info:', error);
    throw error;
  }
}

// Get information about languages for a specific repo 
export async function getRepoLanguages(owner: string, repo: string) {
  try {
    const { data } = await octokit.repos.listLanguages({
      owner,
      repo,
    });
    return data;
  } catch (error) { 
    console.error('Error fetching repo languages:', error);
    throw error;
  }
}




// Get repository issues with optional label filtering
export async function getRepoIssues(owner: string, repo: string, labels?: string[]) {
  try {
    const { data } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      labels: labels ? labels.join(',') : undefined,
    });
    return data;
  } catch (error) {
    console.error('Error fetching repo issues:', error);
    throw error;
  }
}

// Get repository README.md content
export async function getRepoReadme(owner: string, repo: string) {
  try {
    const { data } = await octokit.repos.getReadme({
      owner,
      repo,
    });
    if ('content' in data && typeof data.content === 'string') {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return content;
    }
    throw new Error('Invalid data format: content not found');
  } catch (error) {
    console.error('Error fetching repo README:', error);
    throw error;
  }
}

// Get repository CONTRIBUTING.md content
export async function getRepoContributorFile(owner: string, repo: string) {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'CONTRIBUTING.md',
    });
    if ('content' in data && typeof data.content === 'string') {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return content;
    }
    throw new Error('Invalid data format: content not found');
  } catch (error) {
    console.error('Error fetching repo contributor file:', error);
    throw error;
  }
}

// Additional utility function: Get repository contributors
export async function getRepoContributors(owner: string, repo: string) {
  try {
    const { data } = await octokit.repos.listContributors({
      owner,
      repo,
    });
    return data;
  } catch (error) {
    console.error('Error fetching repo contributors:', error);
    throw error;
  }
}