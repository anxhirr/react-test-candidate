# Flex Business Solutions - Task Management System

This is a Next.js application built for Flex Business Solutions. It's a task management system that allows users to
manage their tasks across different statuses.

## Tech Stack

-   **Framework**: Next.js 15 with App Router
-   **UI Components**: Radix UI primitives with Tailwind CSS
-   **State Management**: React Context Api
-   **Forms**: React Hook Form
-   **Validation** Zod
-   **TypeScript**: Full type safety throughout the application

## Prerequisites

Before running this application, make sure you have:

-   Node.js (v18 or higher)

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/             # Next.js app router pages
├── components/      # Reusable UI components
├── lib/             # Utility functions
├── hooks/           # Reusable react hooks
├── schema/          # Validation schemas
├── types/           # Reusable Typescript types
├── data/            # Dummy data for test usage
└── context/         # React context providers
```
