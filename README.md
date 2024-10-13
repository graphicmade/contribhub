
<div align="center">

![ContribHub Logo](app/opengraph-image.png)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
[![GitHub](https://img.shields.io/badge/GitHub_API-181717?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/en/rest)

ContribHub is a platform designed to connect developers with open-source projects that need their contributions, making the process of discovering and contributing to open-source software seamless. 🚀

</div>

## ✨ Features

- 📋 Curated lists of open-source projects
- 🏷️ Categorization by project type and contribution type
- 🔗 GitHub integration for detailed project information
- 🔐 User authentication via GitHub
- 📱 Responsive design for optimal viewing on various devices

## 🛠️ Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- GitHub API (via Octokit)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following tools installed:

- Node.js
- npm or yarn
- Git
- A Supabase account

### Setting up Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/graphicmade/contribhub.git
   cd contribhub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Create a `.env` file** by copying the `.env.example` file and adding the necessary API keys and environment variables for Supabase and GitHub:
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application should now be running on `http://localhost:3000`.

### Importing the Database Schema to Supabase

To import the schema from `seed.sql` to your local Supabase database, follow these steps:

1. **Open the Supabase dashboard** and navigate to your project.
2. Go to the **SQL** tab in the dashboard.
3. **Copy the SQL content** from the `seed.sql` file located in the repository.
4. **Paste the SQL** into the Supabase SQL editor and execute the query. This will set up the required database schema for ContribHub.
5. After running the SQL script, your Supabase instance should be configured with the necessary tables and data.

### Additional Configuration

Once the schema is set up, make sure to update any remaining environment variables in your `.env` file to ensure the application connects properly to your Supabase instance.

## 📁 Project Structure

- `/app`: Contains Next.js routing and page components.
- `/components`: Reusable UI components built with React.
- `/services`: Utility functions and API calls.
- `/public`: Static assets such as images and icons.

## 🤝 Contributing

We welcome contributions from the community! Please refer to our [Contributing Guidelines](CONTRIBUTING.md) for details on how to contribute effectively. All contributions, big or small, are valuable to us!

## 📄 License

This project is licensed under the [AGPL License](LICENSE). You are free to use, modify, and distribute it under the terms of this license.

## 📬 Contact

If you encounter any issues or have questions, feel free to open an issue on our [GitHub repository](https://github.com/graphicmade/contribhub/issues).

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/graphicmade/contribhub?style=social)](https://github.com/graphicmade/contribhub/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/graphicmade/contribhub?style=social)](https://github.com/graphicmade/contribhub/network/members)
[![GitHub issues](https://img.shields.io/github/issues/graphicmade/contribhub?style=social)](https://github.com/graphicmade/contribhub/issues)

</div>
