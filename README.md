# InkluKids

React (Create React App) frontend plus a **Node/Express + MongoDB** API in **`server/`**. The old **`backend/`** folder is unused; see `backend/README.md`.

## System description (for summative demo)

**InkluKids** is a web-based support and learning platform that connects **teachers, parents, children, and admins**. It provides authentication, role-based access, and features for tracking learning activities/progress, assignments, announcements, messages, and support requests.

## Problem statement

Many learning environments (especially where individualized support is needed) struggle with:

- fragmented communication between school and home
- difficulty tracking progress over time
- inconsistent access to assignments/activities and support resources

## Why it’s a problem

When information is scattered across chats, paper notes, and different apps, it becomes hard to coordinate care/learning plans, measure progress, and respond quickly to support needs.

## Proposed solution

Provide a single web app with:

- role-based login (teacher/parent/child/admin)
- centralized activities and progress tracking
- assignments and training tasks management
- announcements and messaging
- support request workflow

## Run locally

### Prerequisites

- Node.js (LTS recommended) + npm
- MongoDB running locally **or** a MongoDB Atlas connection string
- (Optional) Docker Desktop if you want to run local MongoDB via `docker compose`

### 1) Start MongoDB

Pick one:

- **Docker (recommended for local)**:
  - Start Docker Desktop
  - From the repo root:
    - `docker compose up -d`
- **Local MongoDB service**:
  - Ensure MongoDB is running on `mongodb://127.0.0.1:27017`

### 2) Configure and run the API

From the repo root:

1. Copy env file:
   - Copy `server/.env.example` → `server/.env`
2. Set required variables in `server/.env`:
   - `MONGO_URI`
   - `JWT_ACCESS_SECRET` (16+ chars; 32+ recommended)
   - `JWT_REFRESH_SECRET` (16+ chars; 32+ recommended)
   - `CLIENT_ORIGIN` (usually `http://localhost:3000`)
3. Install + start:
   - `cd server`
   - `npm install`
   - `npm start`

API defaults to `http://localhost:5000`. Health check: `GET /health`.

### 3) Configure and run the frontend

From the repo root:

1. Install:
   - `npm install`
2. Start:
   - `npm start`

Frontend defaults to `http://localhost:3000`.

### Common local dev values

- **Frontend → API base URL**: set `REACT_APP_API_BASE` (optional). If not set, the frontend uses `http://localhost:5000` (see `src/api/client.js`).
- **CORS**: `CLIENT_ORIGIN` supports a comma-separated list (useful if you have multiple allowed origins).

## Production checklist

- Set **`CLIENT_ORIGIN`** on the server to your **exact** live site URL (e.g. `https://myapp.vercel.app`).
- Build the SPA with **`REACT_APP_API_BASE`** pointing at your **public API** URL.
- If the SPA and API are on **different domains**, set **`REFRESH_COOKIE_CROSS_SITE=true`** on the server and serve the API over **HTTPS** (refresh cookies use `SameSite=None; Secure`).
- Never commit real `.env` files or JWT secrets.

## Deployment (example: Vercel + Render)

Typical setup:

- **Frontend (React SPA)**: Vercel (or Netlify)
- **API (Node/Express)**: Render (or Railway/Fly.io)
- **MongoDB**: MongoDB Atlas (recommended)

### Deploy the API (`server/`)

Create a new web service pointing at the `server/` folder.

- **Build command**: `npm install`
- **Start command**: `npm start`

Set these environment variables on your host:

- **`MONGO_URI`**: your Mongo connection string
- **`JWT_ACCESS_SECRET`**: 16+ chars (32+ recommended)
- **`JWT_REFRESH_SECRET`**: 16+ chars (32+ recommended)
- **`CLIENT_ORIGIN`**: comma-separated allowed browser origins (your live frontend URL(s))
- **`REFRESH_COOKIE_CROSS_SITE`**: `true` if frontend + API are on different site names (requires HTTPS)
- **`ACCESS_TOKEN_TTL`** (optional): e.g. `15m`
- **`REFRESH_TOKEN_TTL_DAYS`** (optional): e.g. `30`

Verify the API is up by visiting `/health` on the deployed API.

### Deploy the frontend (repo root)

Create a new frontend project pointing at the repo root.

Set this environment variable **at build time**:

- **`REACT_APP_API_BASE`**: your deployed API base URL (e.g. `https://your-api.onrender.com`)

Then deploy. The browser will call the API at `REACT_APP_API_BASE` and include cookies (`credentials: 'include'`).

## Summative submission checklist (video + links)

In your **5–10 minute** self-recorded demo video, cover:

- **The description of the system**
- **The problem statement**
- **Why it is a problem**
- **The proposed solution**
- **The demo** (show key user flows and pages)
- Confirm the prototype reflects the **SRS requirements**
- Confirm the prototype captures the **actors and processes** in your system design

### Submission instructions

1. Create a Google Doc named: `personNames_[Summative]_[MMDDYYYY]`
2. Paste into the Google Doc:
   - Link to your demo video
   - Link to your public GitHub repo
   - Link to your SRS document
   - Link to your deployed product (public URL)
3. Ensure:
   - Repo is **public**
   - All links are accessible and working (doc sharing enabled)

### Project links (fill these before submitting)

- **Deployed frontend (Vercel)**: `<PASTE_VERCEL_URL_HERE>`
- **Deployed API (Render)**: `<PASTE_RENDER_URL_HERE>`
- **GitHub repo**: `<PASTE_GITHUB_URL_HERE>`
- **SRS document**: `<PASTE_SRS_URL_HERE>`

## Automated QA (build + tests)

From the repo root:

```bash
npm run qa
```

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
