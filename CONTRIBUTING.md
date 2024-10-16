
# Contributing to ContribHub

We're excited that you're interested in contributing to ContribHub! This document will guide you through the process of setting up the project locally and making contributions.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up the Development Environment](#setting-up-the-development-environment)
3. [Configuring Supabase](#configuring-supabase)
4. [Running the Project](#running-the-project)
5. [Making Changes](#making-changes)
6. [Submitting a Pull Request](#submitting-a-pull-request)
7. [Code Style Guidelines](#code-style-guidelines)
8. [Community Guidelines](#community-guidelines)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- pnpm (v7 or later)
- Git
- Docker (for local Supabase setup)

## Setting Up the Development Environment

1. **Fork the ContribHub repository** on GitHub.

2. **Clone your forked repository locally**:
   ```bash
   git clone https://github.com/your-username/contribhub.git
   cd contribhub
   ```

3. **Install project dependencies**:
   ```bash
   pnpm install
   ```

4. **Set up Supabase locally**:
   - Install Supabase CLI ([Guides](https://supabase.com/docs/guides/local-development/cli/getting-started))
   - Start Supabase: `supabase start`
   - This will spin up a local Supabase instance using Docker.
   - Keep this terminal window running, as you will need the `anon` and `service_role` keys in later steps.

## Configuring Supabase

### Connect the Frontend to the Supabase Backend

1. **Copy the `.env.example` file to `.env.local`:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your own values:**

   - `GITHUB_APP_TOKEN`: Your GitHub personal access token ([GitHub Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens))
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The `anon` key from the Supabase local dev setup
   - `SUPABASE_SERVICE_KEY`: The `service_role` key from the Supabase local dev setup
   - `NEXT_PUBLIC_SUPABASE_URL`: The API URL from the Supabase local dev setup
   - `NEXT_PUBLIC_CONTRIBHUB_ORIGIN_DOMAIN`: The domain where your ContribHub instance is running (e.g., `http://localhost:3000` for local development)
   - `NODE_ENV`: Set to `development` or `production` depending on your environment

   **Note**: Keep your `.env.local` file secure and never commit it to version control.

### Enable GitHub Authentication in Supabase

1. **Register an OAuth application on GitHub** ([Supabase GitHub Login Guide](https://supabase.com/docs/guides/auth/social-login/auth-github?queryGroups=language&language=js&queryGroups=environment&environment=server&queryGroups=framework&framework=nextjs#register-a-new-oauth-application-on-github))

2. **Modify the `config.yaml` in the Supabase folder**:
   ```toml
   [auth.external.github]
   enabled = true
   client_id = "env(GITHUB_CLIENT_ID)"
   secret = "env(GITHUB_SECRET)"
   ```

3. **Add the following to `.env.local` inside the Supabase folder**:
   ```bash
   GITHUB_CLIENT_ID=<your-client-id>
   GITHUB_SECRET=<your-client-secret>
   ```

## Running the Project

1. **Start the development server**:
   ```bash
   pnpm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:3000` to see the application running.

## Making Changes

1. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the relevant files.

3. **Test your changes** thoroughly.

4. **Commit your changes** with a descriptive commit message:
   ```bash
   git commit -m "Add feature: your feature description"
   ```

## Submitting a Pull Request

1. **Push your changes** to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a pull request** in the original ContribHub repository on GitHub.

3. **Provide a clear title and description** for your pull request, explaining the changes you've made.

4. **Wait for the maintainers to review** your pull request. They may ask for changes or clarifications.

## Code Style Guidelines

- Follow the existing code style in the project.
- Use TypeScript for all new files.
- Use meaningful variable and function names.
- Write clear comments for complex logic.
- Ensure your code is properly formatted (use `npm run lint` to check for linting issues).

## Community Guidelines

- Be respectful and inclusive in all interactions.
- If you find a bug or have a feature request, please open an issue before starting work on it.
- For major changes, open an issue first to discuss your proposal with the maintainers.

Thank you for contributing to ContribHub! Your efforts help make open-source contribution more accessible to everyone.
