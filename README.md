# InkluKids

React (Create React App) frontend plus a **Node/Express + MongoDB** API in **`server/`**. The old **`backend/`** folder is unused; see `backend/README.md`.

## Run locally

1. **MongoDB** — e.g. `docker compose up -d` (see `docker-compose.yml`) or your own instance on port `27017`.
2. **API** — copy `server/.env.example` to `server/.env`, set secrets (16+ characters), then:
   - `cd server && npm install && npm start`  
   Default API: `http://localhost:5000`, CORS origin: `CLIENT_ORIGIN` in `.env` (usually `http://localhost:3000`).
3. **Frontend** — from the repo root: `npm install && npm start`  
   The app calls `REACT_APP_API_BASE` or `http://localhost:5000` (see `src/api/client.js`).

## Production checklist

- Set **`CLIENT_ORIGIN`** on the server to your **exact** live site URL (e.g. `https://myapp.vercel.app`).
- Build the SPA with **`REACT_APP_API_BASE`** pointing at your **public API** URL.
- If the SPA and API are on **different domains**, set **`REFRESH_COOKIE_CROSS_SITE=true`** on the server and serve the API over **HTTPS** (refresh cookies use `SameSite=None; Secure`).
- Never commit real `.env` files or JWT secrets.

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
