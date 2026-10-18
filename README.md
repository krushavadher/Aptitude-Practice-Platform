# Aptitude Practice Platform

A full-stack web app where students practice aptitude questions topic-wise, take timed tests, see answers with explanations after submitting, and compete on a leaderboard. Admins can generate questions with Google Gemini and must review and approve them before they are published.

**Stack:** MongoDB · Express · React · Node.js (MERN) + Google Gemini API

> **Status:** Deployed. Frontend on Vercel, backend on Render, database on MongoDB Atlas.

## Live Demo

| | Link |
|---|---|
| **Frontend (Vercel)** | https://aptitude-practice-platform.vercel.app |
| **Backend API (Render)** | https://aptitude-practice-platform.onrender.com |
| **Health check** | https://aptitude-practice-platform.onrender.com/api/health |

> The backend runs on Render's free tier and sleeps after inactivity. The first request may take 30-60 seconds to wake it up.

## Features

- **Topic-wise question bank** across Quantitative, Logical Reasoning, and Verbal topics
- **Practice mode** with instant answer checking and explanations
- **Timed tests** with server-enforced expiry and server-side scoring
- **AI question generation** using Gemini, with validation and duplicate checks
- **Admin review workflow**: AI questions are saved as drafts and only approved questions reach students
- **Leaderboard**: global, weekly, and per-topic rankings
- **Student dashboard**: attempt history and per-topic accuracy
- **Role-based access**: student and admin roles with JWT authentication

## How It Works

```
Choose Topic → Practice / Start Test → Submit → Answers + Explanations → Score → Leaderboard
```

Correct answers and explanations are never sent to the client while a test is in progress. Scoring and timer checks happen on the server.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Axios, Tailwind CSS |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB Atlas |
| Auth | JWT, bcrypt |
| Validation | Zod |
| Security | helmet, cors, express-rate-limit |
| AI | Google Gemini API (`@google/genai`) |
| Testing | Jest, Supertest, mongodb-memory-server |
| Hosting | Vercel (frontend), Render (backend) |

## Project Structure

```
aptitude-practice-platform/
├── client/                 # React frontend
└── server/
    └── src/
        ├── config/         # DB and env setup
        ├── models/         # Mongoose schemas
        ├── routes/         # API routes
        ├── controllers/    # Request/response handling
        ├── services/       # Business logic (scoring, AI, leaderboard)
        ├── middleware/     # Auth, roles, validation, rate limiting
        ├── validators/     # Zod schemas
        ├── prompts/        # Gemini prompt templates
        ├── seed/           # Seed scripts
        └── tests/          # Automated tests
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- A MongoDB Atlas cluster and connection string
- A Gemini API key from [Google AI Studio](https://aistudio.google.com)

### Setup

```bash
git clone <your-repo-url>
cd aptitude-practice-platform/server
npm install
cp .env.example .env
```

Fill in `server/.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=a_stable_gemini_flash_model_id
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=a_strong_password
```

Never commit `.env`. Only `.env.example` belongs in the repository.

### Seed the database

```bash
npm run seed:topics
npm run seed:admin
npm run seed:questions
```

### Run the server

```bash
npm run dev
```

The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health` to confirm it is up.

### Run the client

```bash
cd ../client
npm install
npm run dev
```

The client runs at `http://localhost:5173`. For local development it needs `VITE_API_URL=http://localhost:5000/api` in `client/.env`.

### Run tests

```bash
npm test
```

## API Overview

All responses use the shape `{ success, data, message }`.

### Auth

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Logged in |

### Topics and Practice

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/topics` | Logged in |
| GET | `/api/practice/:topicId` | Student |
| POST | `/api/practice/check` | Student |

### Tests and Progress

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/tests/start` | Student |
| POST | `/api/tests/:id/submit` | Owner |
| GET | `/api/tests/:id/result` | Owner |
| GET | `/api/me/attempts` | Logged in |
| GET | `/api/me/stats` | Logged in |

### Leaderboard

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/leaderboard` | Logged in |
| GET | `/api/leaderboard/:topicId` | Logged in |

### Admin

| Method | Endpoint | Purpose |
|---|---|---|
| POST / PUT / DELETE | `/api/admin/topics` | Manage topics |
| POST / PUT / DELETE | `/api/admin/questions` | Manage questions |
| GET | `/api/admin/questions` | List and filter questions |
| POST | `/api/admin/ai/generate` | Generate draft questions with Gemini |
| PATCH | `/api/admin/questions/:id/review` | Approve or reject a draft |
| GET | `/api/admin/stats` | Platform statistics |

## AI Question Pipeline

1. Admin selects a topic, subtopic, difficulty, and count.
2. The backend prompts Gemini for a strict JSON array of questions.
3. Each question is validated: schema, four unique options, valid answer index, length limits, and duplicate check.
4. An optional verification pass asks Gemini to solve each question independently and flags any that disagree with the stored answer.
5. Valid questions are saved as `draft`. Nothing from the AI is ever saved as `approved`.
6. An admin reviews each draft and approves, edits, or rejects it. Only approved questions are served to students.

## Security

- Passwords hashed with bcrypt
- JWT authentication with role-based route guards
- Request validation on every endpoint
- Rate limiting on login and AI routes
- Gemini API key used on the server only
- Correct answers hidden from the client during live tests

## Deployment

### Backend (Render)

- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment variables:** `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `CLIENT_URL`, `NODE_ENV=production`
- In MongoDB Atlas, allow Render's connection under Network Access.
- Set `CLIENT_URL` to the exact Vercel URL, with no trailing slash.

### Frontend (Vercel)

- **Root Directory:** `client`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment variable:** `VITE_API_URL=https://<your-render-service>.onrender.com/api`
- Redeploy after changing environment variables, since Vite reads them at build time.

## Roadmap

- [x] Project structure and models
- [x] Authentication
- [x] Topics and question management
- [x] Practice mode and timed tests
- [x] Leaderboard
- [x] AI generation and admin review
- [x] Automated tests
- [x] React frontend
- [x] Deployment
