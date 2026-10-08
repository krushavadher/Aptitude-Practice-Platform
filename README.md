# Aptitude Practice Platform

A MERN + Gemini web app for students to practice aptitude questions topic-wise, take timed tests, see answers with explanations, and compete on a leaderboard. Admins can generate questions with Gemini AI and must review and approve them before publishing.

## Tech Stack
- **Frontend**: React (Vite), React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express, Mongoose, JWT, bcrypt, Zod, helmet, cors, express-rate-limit, dotenv
- **Database**: MongoDB Atlas
- **AI**: Google Gemini API (@google/generative-ai)

## Setup Steps

### Prerequisites
- Node.js installed
- MongoDB URI
- Google Gemini API Key

### Server
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your values.
4. Start the server: `npm run dev`

### Client
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your values.
4. Start the client dev server: `npm run dev`
