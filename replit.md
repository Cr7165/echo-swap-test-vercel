# replit.md

## Overview

This is a portfolio/project showcase application built as a full-stack TypeScript web app. It allows users to create, view, and manage portfolio projects with features like image URLs, project links, repository links, and technology tags. The application follows a modern React frontend with an Express backend architecture, using PostgreSQL for data persistence.

Additionally, there's a standalone Python script (`main.py`) for monitoring SOL cryptocurrency prices and sending Telegram alerts on price dips - this appears to be a separate utility unrelated to the main portfolio application.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with CSS variables for theming, dark mode-first design
- **UI Components**: Shadcn/ui component library (Radix UI primitives with custom styling)
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful API with typed routes defined in `shared/routes.ts`
- **Validation**: Zod schemas for input validation and type inference
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Architecture**: Storage pattern with `IStorage` interface for data access abstraction

### Shared Code
- **Location**: `shared/` directory contains code shared between frontend and backend
- **Schema**: `shared/schema.ts` defines database tables and Zod validation schemas using drizzle-zod
- **Routes**: `shared/routes.ts` defines API contract with typed inputs and responses

### Database Schema
- **Projects Table**: Stores portfolio projects with fields for title, description, imageUrl, projectUrl, repoUrl, tags (array), and createdAt timestamp

### Development vs Production
- Development uses Vite dev server with HMR
- Production builds client to `dist/public` and bundles server with esbuild
- Build script in `script/build.ts` handles bundling with selective dependency externalization

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations in `./migrations` directory

### Third-Party APIs (Python Script)
- **Coinbase API**: Fetches SOL-USD spot prices
- **Telegram Bot API**: Sends price alert notifications

### Key NPM Packages
- **UI**: Radix UI primitives, Framer Motion, Lucide icons
- **Forms**: React Hook Form with Zod resolver
- **Database**: drizzle-orm, pg (node-postgres)
- **Validation**: Zod, drizzle-zod
