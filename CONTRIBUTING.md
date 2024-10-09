# Contributing to ContribHub

We're excited that you're interested in contributing to ContribHub! This document will guide you through the process of setting up the project locally and making contributions.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up the Development Environment](#setting-up-the-development-environment)
3. [Configuring Supabase](#configuring-supabase)
4. [Running the Project](#running-the-project)
5. [Making Changes](#making-changes)
6. [Submitting a Pull Request](#submitting-a-pull-request)
6. [Code Style Guidelines](#code-style-guidelines)
7. [Community Guidelines](#community-guidelines)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- pnpm (v7 or later)
- Git
- Docker (for local Supabase setup)

## Setting Up the Development Environment

1. Fork the ContribHub repository on GitHub.

2. Clone your forked repository locally:
   ```
   git clone https://github.com/your-username/contribhub.git
   cd contribhub
   ```

3. Install project dependencies:
   ```
   pnpm install
   ```

4. Set up Supabase locally:
   - Install Supabase CLI ([Guides](https://supabase.com/docs/guides/local-development/cli/getting-started))
   - Start Supabase: `supabase start`
   - This will spin up a local Supabase instance using Docker
   - Keep the terminal window open and running the Supabase local dev setup, we need the anon key and the service role key later

## Configuring Supabase 

### Connect the frontend to the backend (supabase)

1. Copy the .env.example file to .env.local 

2. Replace the values in the .env.local file with your own values, here is a guide to what each value is for:

   - `GITHUB_APP_TOKEN`: Your GitHub personal access token [GitHub Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anon key from the values you got when you started the supabase local dev setup
   - `SUPABASE_SERVICE_KEY`: The service role key from the values you got when you started the supabase local dev setup
   - `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project, which is the API URL value from the supabase local dev setup
   - `NEXT_PUBLIC_CONTRIBHUB_ORIGIN_DOMAIN`: The domain where your ContribHub instance is running (e.g., http://localhost:3000 for local development)
   - `NODE_ENV`: The environment (development, production, etc.)

   Note: Make sure to keep your .env.local file secure and never commit it to version control.


### Enable Authentication with GitHub on your local environment

1. Register an OAuth application on GitHub [Supabase Guide](https://supabase.com/docs/guides/auth/social-login/auth-github?queryGroups=language&language=js&queryGroups=environment&environment=server&queryGroups=framework&framework=nextjs#register-a-new-oauth-application-on-github)

2. Go the folder that supabase generated (supabase)

3. In the config.yaml file, add this : 

```toml
[auth.external.github]
enabled = true
client_id = "env(GITHUB_CLIENT_ID)"
secret = "env(GITHUB_SECRET)"
redirect_uri = "" # Overrides the default auth redirectUrl.
```

4. In the .env.local of the folder inside supabase, add this : 

```
GITHUB_CLIENT_ID=<your-client-id>
GITHUB_SECRET=<your-client-secret>
```

## Running the Project

1. Start the development server:
   ```
   pnpm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the application running.

## Making Changes

1. Create a new branch for your feature or bug fix:
   ```
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the relevant files.

3. Test your changes thoroughly.

4. Commit your changes with a descriptive commit message:
   ```
   git commit -m "Add feature: your feature description"
   ```

## Submitting a Pull Request

1. Push your changes to your forked repository:
   ```
   git push origin feature/your-feature-name
   ```

2. Go to the original ContribHub repository on GitHub and create a new pull request.

3. Provide a clear title and description for your pull request, explaining the changes you've made.

4. Wait for the maintainers to review your pull request. They may ask for changes or clarifications.

## Code Style Guidelines

- Follow the existing code style in the project.
- Use TypeScript for all new files.
- Use meaningful variable and function names.
- Write clear comments for complex logic.
- Ensure your code is properly formatted (you can use `npm run lint` to check for linting issues).

## Community Guidelines

- Be respectful and inclusive in your interactions with other contributors.
- If you find a bug or have a feature request, please open an issue on GitHub before starting work on it.
- For major changes, please open an issue first to discuss the proposed changes with the maintainers.

Thank you for contributing to ContribHub! Your efforts help make open-source contribution more accessible to everyone.
