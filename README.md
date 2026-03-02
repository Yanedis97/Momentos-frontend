This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Deploy on Vercel

Momentos Frontend

Frontend application for Momentos, an interactive narrative engine where players explore historical events step by step.

This application consumes the Historical Moments API and renders the interactive experience for players.

Overview

Momentos is a narrative system where:

A Moment represents a historical or narrative event.

Each moment has structured narrative states:

inicio

contexto

evento

suceso

reaccion

dato_curioso

Players progress step-by-step.

The frontend only renders what the backend decides.

All business logic lives in the backend.

Tech Stack

Next.js (App Router)

TypeScript

React

REST API integration

CSS (global styles)

Architecture Principles

No business logic in the frontend.

The backend controls narrative state.

The frontend acts as a presentation layer.

Components are reusable and UI-focused.

API calls are centralized in services.

Project Structure
app/
│
├── dashboard/
├── login/
├── moments/
├── players/
│   └── [id]/
│       └── moments/
│
components/
│
services/
│
types/
Main Features

Player creation

Moment creation (admin view)

Player dashboard

Interactive moment progression

Narrative state rendering

Player-specific moment tracking

Environment Variables

Create a .env.local file:

NEXT_PUBLIC_API_URL=http://localhost:8000
Installation
npm install

Run development server:

npm run dev
API Dependency

This frontend requires the Historical Moments API running locally or in production.

Default expected backend URL:

http://localhost:8000
Future Improvements

Authentication with JWT

Protected routes

Global state management

UI/UX improvements

Performance optimization

Deployment configuration

Author

Yanedis Margarita Maza