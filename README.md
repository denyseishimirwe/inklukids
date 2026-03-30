# InkluKids

**A web platform supporting autism inclusion in Rwandan schools.**

InkluKids connects teachers, parents, children, and school administrators in one system for coordinated support, communication, and progress tracking.

---

## Live System 

- **Frontend (Vercel):** [https://inklukids.vercel.app](https://inklukids.vercel.app)
- **Backend API (Render health):** [https://inklukids.onrender.com/health](https://inklukids.onrender.com/health)

> Note: Render free instances may sleep. First request can take a short time to wake up.

---

## System Overview

### Problem Statement
Communication and learning support for autistic children is often fragmented between home and school. This makes it difficult to monitor progress, align interventions, and respond quickly to learner needs.

### Proposed Solution
InkluKids provides one role-based platform where teachers, parents, children, and administrators can collaborate through assignments, progress records, training, and messaging.

---

## User Roles and Core Functions

- **Teacher**
  - Complete training modules
  - Monitor learners
  - Assign activities
  - Message parents
- **Parent**
  - Link child accounts
  - View assigned activities
  - Track child progress
  - Communicate with teachers
- **Child**
  - Access assigned activities
  - Complete activities
  - Earn progress points
- **Admin**
  - Manage users
  - Monitor training completion
  - View system-level reports

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React (Create React App) |
| Styling | CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas + Mongoose |
| Authentication | JWT + bcryptjs + refresh token cookies |
| Deployment | Vercel (frontend) + Render (API) |

---

## Repository Structure

```text
inklukids/          # default folder name after `git clone` (rename if yours differs)
├── src/
│   ├── App.js
│   ├── App.css
│   └── api/client.js
├── server/
│   ├── src/
│   │   ├── server.js
│   │   ├── app.js
│   │   ├── config/env.js
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── package.json
│   └── .env.example
├── docker-compose.yml
└── README.md
```

> The `backend/` folder is legacy and not used by the deployed solution.

---

## Local Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas (recommended) or local MongoDB

For **local MongoDB** with Docker, from the repo root run `docker compose up -d`, then set `MONGO_URI=mongodb://127.0.0.1:27017/inklukids` (or your DB name) in `server/.env`.

### 1) Clone
```bash
git clone https://github.com/denyseishimirwe/inklukids.git
cd inklukids
```
Git creates a folder named `inklukids` by default. If you cloned into another directory name, `cd` into that folder instead.

### 2) Frontend
```bash
npm install
npm start
```
Frontend runs at `http://localhost:3000`. You do **not** need `REACT_APP_API_BASE` for local dev: the app defaults to `http://localhost:5000` for API calls.

### 3) Backend (`server/`)
```bash
cd server
npm install
```

Create local env file from template:

Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

macOS/Linux:
```bash
cp .env.example .env
```

Set required values in `server/.env` (copy from `server/.env.example` and replace placeholders). The API validates **`JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` to at least 16 characters each**—use long random strings, not short passwords.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_long_random_secret_at_least_16_chars
JWT_REFRESH_SECRET=your_other_long_random_secret_at_least_16_chars
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL_DAYS=30
CLIENT_ORIGIN=http://localhost:3000
REFRESH_COOKIE_CROSS_SITE=false
```

Start backend:
```bash
npm start
```

API runs at `http://localhost:5000` (`GET /health` for status).

---

## Deployment Configuration (Vercel + Render + Atlas)

### Backend (Render)
- **Root directory:** `server`
- **Build command:** `npm install`
- **Start command:** `npm start`

Set environment variables:
- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `CLIENT_ORIGIN=https://inklukids.vercel.app`
- `REFRESH_COOKIE_CROSS_SITE=true`
- `ACCESS_TOKEN_TTL` (optional)
- `REFRESH_TOKEN_TTL_DAYS` (optional)

### Frontend (Vercel)
- **Root directory:** repository root
- **Build command:** `npm run build`
- **Output directory:** `build`

Set environment variable:
- `REACT_APP_API_BASE=https://inklukids.onrender.com` (no trailing slash; required so the deployed site talks to Render, not only `localhost`)

---



### Submission Links
- **GitHub Repository:** [https://github.com/denyseishimirwe/inklukids](https://github.com/denyseishimirwe/inklukids)
- **Frontend URL:** `https://inklukids.vercel.app`
- **Backend Health URL:** `https://inklukids.onrender.com/health`

---

## Author

**Denyse Ishimirwe**  
African Leadership University  
Software Engineering Summative Project
