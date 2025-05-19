# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules. It is designed to be a starting point for building modern web applications.

## Tech Stack

- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces, focusing on component-based architecture.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript, providing static type checking.
- **[Vite](https://vitejs.dev/)**: A fast build tool and development server for modern web projects, offering instant HMR (Hot Module Replacement).
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Shadcn](https://shadcn.dev/)**: A component library for building accessible and customizable UI components.
- **[Recoil](https://recoiljs.org/)**: A state management library for React applications, providing a simple and flexible API.
- **[React Hook Form](https://react-hook-form.com/)**: A library for managing form state in React applications, focusing on performance and simplicity.
- **[Zod](https://zod.dev/)**: A TypeScript-first schema declaration and validation library.

## Available Scripts

Here are some common scripts you can use in this project:

- **`npm run dev`**: Starts the development server with Vite.
- **`npm run build`**: Builds the application for production.
- **`npm run serve`**: Serves the production build locally.
- **`npm run lint`**: Runs ESLint to check for linting errors.
- **`npm run format`**: Formats the code using Prettier.

This project serves as a template repository for all testing, built with Vite, Tailwind, Shadcn, Recoil, React Hook Form, and Zod.

> **Important**: For complete setup instructions and documentation, please refer to our [Project Setup Guide](https://github.com/General-Magick-Industries/remote-cicd-workflows/blob/main/PROJECT_SETUP.md).

## Quick Start

1. **Create Repository**
   - Use this template to create a new repository
   - Follow naming convention: `{FED|BED|AGD}-{project-name}`
   - Ensure "Include all branches" is selected with private visibility

2. **Initial Setup**
   ```bash
   git clone https://github.com/your-org/your-repo.git
   git checkout pipeline-setup
   # Update cicd-variables.json with your project settings
   git add cicd-variables.json
   git commit -m "Update CI/CD variables"
   git push origin pipeline-setup
   ```

3. **Development Workflow**
   ```bash
   git checkout develop
   git checkout -b feature/your-feature
   # Make changes
   # Create PR to develop
   ```

## Key Branches
- `main` - Production
- `staging` - UAT environment
- `develop` - Development
- `pipeline-setup` - CI/CD configuration

## Need Help?
- Check [Project Setup Guide](https://github.com/General-Magick-Industries/remote-cicd-workflows/blob/main/PROJECT_SETUP.md)
- Contact DevOps team (aung.myat@globalmagicko.com)
- Create an issue in the repository
