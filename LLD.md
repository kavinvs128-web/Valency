# Low-Level Design (LLD)

## 1. Scope

This document describes the detailed design of the Valency system at the module and component level. It documents the main frontend components, backend routes, controllers, middleware, models, data flow, and core interactions required to implement and operate the platform.

## 2. Frontend Design

### 2.1 Application Shell

The frontend entry point is defined in `frontend/src/App.jsx` and handles:

- browser routing
- lazy loading of page modules
- protected route guarding
- initial page loader state

Routes in the application include:

- `/` → landing/start screen
- `/signin` → sign-in
- `/create-account` → account creation
- `/oauth-success` → OAuth callback result screen
- `/home` → protected home/dashboard route

### 2.2 Route Protection

The `PrivateRoute` component ensures that only authenticated users can access protected pages. It checks session state or saved token state before allowing access.

### 2.3 Core Page Modules

Major frontend screens include:

- `start.jsx` for the intro experience
- `Signin.jsx` for login
- `CreateAccount.jsx` for registration
- `Home.jsx` as the post-login hub
- `WeeklyTestPage.jsx` for assessments and countdown logic
- additional chemistry content pages such as `MoleConcept.jsx`, `EmpiricalMolecularFormula.jsx`, and `OxidationReduction.jsx`

### 2.4 Styling Strategy

The project uses page-specific CSS files under `frontend/src/styles/` and a shared global stylesheet. This keeps visual behavior modular and easy to maintain for each topic or module.

### 2.5 Weekly Test Mechanics

The weekly test flow in `WeeklyTestPage.jsx` is implemented as a stateful component with:

- topic bank definition
- timer and countdown logic
- question-set selection per subject
- scoring logic
- practice mode toggle
- final result evaluation
- submission and attempt persistence

Important behaviors:

- Tests are defined with question banks per topic.
- A Sunday-based lock is determined by the system date.
- Practice mode allows revision without the normal weekly assessment restriction.
- Attempt information is sent to the backend after completion.

## 3. Backend Design

### 3.1 Application Bootstrap

The backend entry point creates an Express application through `backend/src/app.js` and configures:

- CORS
- Helmet
- JSON parsing
- request logging with Morgan
- rate limiting
- Passport initialization
- route registration
- global error handling

### 3.2 Route Registration

The application registers the following API groups:

- `/api/auth` → authentication routes
- `/api/v1/auth` → Google OAuth routing
- `/api/attempts` → attempt listing and creation

### 3.3 Authentication Flow

The authentication controller handles:

- sign-up validation and bcrypt hashing
- login verification and JWT issuance
- current user lookup via token

Protected routes are checked using `requireAuth.js` middleware, which verifies incoming token and binds the authenticated user to the request.

### 3.4 Google OAuth Integration

The Google auth flow is established through:

- `backend/src/config/passport.js`
- OAuth routes in `backend/src/routes/auth.js`

This allows sign-in via external identity provider while maintaining the app’s JWT-based application session pattern.

## 4. Data Layer Design

### 4.1 User Model

Defined in `backend/src/models/user.model.js`.

Responsibilities:

- store login identity and basic profile data
- hash passwords before storing
- support local email/password auth
- support optional Google-based users

### 4.2 Attempt Model

Defined in `backend/src/models/attempt.model.js`.

Schema contents:

- `user` → references the user who attempted the test
- `assessment` → assessment title or category
- `score` → textual score representation
- `scorePct` → numeric percentage
- `breakdown` → array of item-level question results

The breakdown item contains:

- question text
- selected answer
- correct answer
- correct/incorrect flag

This structure allows result review at the per-question level.

## 5. API Design

### 5.1 Auth API

#### POST /api/auth/create

Request body:

- name
- email
- password
- confirmPassword

Behavior:

- validate input
- hash password
- create user
- return success response or validation error

#### POST /api/auth/signin

Request body:

- email
- password

Behavior:

- validate credentials
- compare password hash
- issue JWT
- return auth response

#### GET /api/auth/me

Headers:

- Authorization: Bearer <token>

Behavior:

- validate token
- return authenticated user profile

### 5.2 Attempt API

#### GET /api/attempts

Behavior:

- return a list of attempts for the logged-in user

#### POST /api/attempts

Behavior:

- accept a completed attempt payload
- associated with the current user
- store evaluation data

## 6. Detailed Data Flow

### 6.1 User Registration

1. Client sends POST /api/auth/create.
2. Backend validates required fields.
3. Password is hashed using bcrypt.
4. User record is inserted into MongoDB.
5. Client receives successful response.

### 6.2 Sign-in

1. Client sends credentials to POST /api/auth/signin.
2. Backend checks email and password.
3. If valid, JWT is generated.
4. Client stores token and uses it on protected actions.

### 6.3 Weekly Quiz Submit

1. User selects a quiz.
2. Frontend runs the question logic and determines score.
3. Client builds a breakdown array.
4. Client sends the attempt to POST /api/attempts.
5. Backend attaches user identity.
6. MongoDB stores the attempt.
7. User sees score summary and history update.

## 7. Error and Failure Handling

### Backend Error Handling

The Express app includes a global error middleware that logs the error and returns a JSON response with a message.

### Frontend Error Handling

Frontend flows should handle:

- failed authentication
- invalid credentials
- dropped API requests
- missing token or protected route access
- quiz submission errors

## 8. Security Design Details

### Passwords

- Stored using bcrypt hashing
- Not exposed in API responses

### JWT

- Used for stateless authentication
- Sent in Authorization header on protected endpoints

### Route Protection

Middleware checks whether a valid token exists before allowing access.

### CORS

The backend permits only known frontend origins such as localhost dev ports.

### Rate Limiting

Configured to reduce abuse and repeated login attempts.

## 9. Key Components and Files

### Frontend

- `frontend/src/App.jsx` — app router and route layout
- `frontend/src/pages/WeeklyTestPage.jsx` — quiz engine and attempt submission
- `frontend/src/components/PrivateRoute.jsx` — auth guard
- `frontend/src/services/api.js` — base API client
- `frontend/src/services/attempts.js` — attempt-related client calls

### Backend

- `backend/src/app.js` — Express app and middleware setup
- `backend/src/server.js` — server startup and DB connection
- `backend/src/controllers/auth.controller.js` — auth behavior
- `backend/src/middleware/requireAuth.js` — JWT guard
- `backend/src/routes/auth.routes.js` — auth endpoints
- `backend/src/routes/attempts.routes.js` — attempts endpoints
- `backend/src/models/user.model.js` — user schema
- `backend/src/models/attempt.model.js` — attempt schema

## 10. Non-Functional Requirements Implementation

### Maintainability

- Backend is separated into routes/controllers/models.
- Frontend is split by page, component, style, and service responsibility.

### Performance

- React lazy loading helps keep initial bundle smaller.
- Data reads are minimized by using user-scoped queries and targeted attempt retrieval.

### Reliability

- Input validation and centralized error handling reduce unstable behavior.
- MongoDB persistence ensures attempt records survive page refreshes and user revisits.

## 11. Summary

The low-level design of Valency is intentionally compact and modular. The frontend orchestrates the user journey, the backend enforces secure business logic, and MongoDB persists both account and assessment data. The design supports a practical learning platform that can evolve with more chapters, teachers, and analytics without a major structural rewrite.
