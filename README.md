# Learning About Chemistry — Valency

A full-stack chemistry learning platform for students: interactive lessons, a weekly quiz feature with live timers and countdown-locked tests, and a personal attempts history — all backed by a real REST API and database.

## Tech stack

### Frontend (`frontend/`)
| Layer | Technology |
|---|---|
| UI library | [React 19](https://react.dev/) |
| Build tool / dev server | [Vite 8](https://vite.dev/) |
| Routing | [react-router-dom v7](https://reactrouter.com/) |
| Icons | [lucide-react](https://lucide.dev/) |
| Animation | [framer-motion](https://motion.dev/) |
| Styling | Hand-written CSS per page (no Tailwind/UI kit), with CSS custom properties for dark/light theming |
| Linting | ESLint 10 + `eslint-plugin-react-hooks` |

No TypeScript — plain JavaScript (JSX) throughout.

### Backend (`backend/`)
| Layer | Technology |
|---|---|
| Runtime / framework | [Node.js](https://nodejs.org/) + [Express 4](https://expressjs.com/) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) via [Mongoose 8](https://mongoosejs.com/) |
| Authentication | [JWT](https://jwt.io/) (`jsonwebtoken`) for email/password sessions, [Passport.js](https://www.passportjs.org/) + `passport-google-oauth20` for "Continue with Google" |
| Password hashing | `bcryptjs` |
| Security middleware | `helmet` (HTTP headers), `cors` (locked to an explicit origin allowlist), `express-rate-limit` |
| Logging | `morgan` |
| Dev tooling | `nodemon` for auto-restart |

The backend follows a layered structure: `routes/` → `controllers/` → `models/`, with `middleware/requireAuth.js` guarding protected endpoints and `config/passport.js` holding the OAuth strategy.

### Database
MongoDB Atlas (cloud-hosted), with two Mongoose models:
- **User** — account credentials and profile info
- **Attempt** — a user's quiz attempt: assessment name, score, score percentage, and a full question-by-question breakdown

## Project structure

```
learning with chemistry/
├── backend/
│   └── src/
│       ├── config/passport.js        # Google OAuth strategy
│       ├── middleware/requireAuth.js # JWT auth guard
│       ├── models/                   # Mongoose schemas (User, Attempt)
│       ├── controllers/              # Request handlers
│       ├── routes/                   # Express routers
│       ├── app.js                    # Express app + middleware wiring
│       └── server.js                 # Entry point — connects DB, starts server
└── frontend/
    └── src/
        ├── pages/                    # One component per screen (Home, Signin, Weekly Test, etc.)
        ├── services/                 # fetch-based API clients
        ├── styles/                   # One CSS file per page
        └── components/               # Shared UI pieces
```

## Key features

- Email/password auth (with confirm-password validation) and Google OAuth sign-in, both issuing a JWT
- Dark/light theme toggle, persisted to `localStorage`, threaded through every page
- **Live Books** → Class 11 lesson tree, with a full interactive Oxidation & Reduction lesson and a "Beyond the Bond" career-roadmap page
- **Weekly Test** — a Sunday-locked quiz hub with a live countdown, three real topic quizzes (Redox, Gaseous State, Organic Reactions), a practice mode, a timed quiz view, and a results/review screen
- **Attempts Corner** — every quiz attempt (practice or graded) is saved to MongoDB and displayed with date, topic, and score
- Manual browser back-button support for in-app navigation (via `pushState`/`popstate`), since most "pages" are conditionally-rendered views rather than router routes

## Running locally

**Backend** (`backend/`):
```bash
npm install
npm run dev   # nodemon, http://localhost:4000
```
Needs a `.env` file with:
```
PORT=4000
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<any random secret>
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
```
`.env.example` in this repo is out of date (missing the `GOOGLE_*` vars and defaulting `PORT` to 5000) — use the list above instead.

**Frontend** (`frontend/`):
```bash
npm install
npm run dev   # Vite, http://localhost:5173
```

The frontend expects the backend on `http://localhost:4000` (hardcoded in `src/services/*.js`), and the backend's CORS allowlist expects the frontend on `http://localhost:5173` — both are configured in `backend/src/app.js`.

## API overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/create` | Create an account |
| POST | `/api/auth/signin` | Sign in, returns a JWT |
| GET | `/api/auth/me` | Current user (requires `Authorization: Bearer <token>`) |
| GET | `/api/v1/auth/oauth/google` | Start Google OAuth flow |
| GET/POST | `/api/attempts` | List / record a quiz attempt (requires auth) |
