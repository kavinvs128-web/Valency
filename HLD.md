# High-Level Design (HLD)

## 1. Overview

Valency is a chemistry learning platform that combines educational lessons, a weekly quiz workflow, and user progress tracking. The product is structured as a modern web application with a React frontend, an Express API backend, and a MongoDB database for persistent records.

The system is designed around a simple layered architecture:

- Client layer handles UI rendering, navigation, and user interactions
- Application layer handles authentication, quiz scoring, and attempt persistence
- Data layer stores user accounts and assessment results
- External services support Google OAuth and cloud-hosted MongoDB

## 2. Business Goals

- Deliver a focused chemistry learning experience for students.
- Support structured content exploration and revision.
- Create a repeatable weekly assessment cycle.
- Record and display quiz performance with minimal friction.
- Enable secure sign-in via email/password and Google OAuth.

## 3. High-Level Architecture

### 3.1 Components

#### Frontend

- Built with React and Vite
- Hosts pages for landing, sign-in, account creation, OAuth callback, home, learning modules, and weekly tests
- Uses client-side routing with React Router
- Persists theme data in localStorage

#### Backend

- Built with Node.js and Express
- Exposes REST endpoints for authentication and attempts
- Uses JWT for stateless authorization
- Uses Passport.js for Google OAuth integration

#### Database

- MongoDB Atlas via Mongoose
- Stores user credentials and quiz attempt records

#### Security

- bcryptjs for password hashing
- Helmet for HTTP security headers
- express-rate-limit for request throttling
- CORS allowlist for trusted origins

## 4. System Context

The system operates as follows:

1. A student visits the frontend application.
2. The student either signs in, creates an account, or authenticates with Google.
3. After login, the student accesses chemistry content and quiz modules.
4. Quiz attempts are evaluated on the client and then posted to the backend.
5. The backend stores results in MongoDB and returns them for display on history pages.

## 5. Major Functional Modules

### 5.1 Authentication Module

Responsible for:

- account creation
- login validation
- JWT generation
- token verification for protected routes
- Google OAuth flow start and callback handling

### 5.2 Learning Content Module

Responsible for:

- lesson browsing
- topic content display
- chemical concept exploration pages
- educational progression within the app

### 5.3 Weekly Assessment Module

Responsible for:

- dynamic quiz cards per topic
- countdown logic for Sunday-based access
- timed test logic
- practice mode behavior
- answer scoring and result summary

### 5.4 Attempt Tracking Module

Responsible for:

- saving completed attempts
- storing answer-level breakdown data
- retrieving user attempt history
- showing score and specific result details

## 6. Data Model Overview

### User

Represents application users and includes:

- name/email/login details
- password hash for local auth
- Google auth metadata where applicable
- account status and timestamps

### Attempt

Represents a completed quiz submission and includes:

- user reference
- assessment/topic identifier
- score string and percentage
- detailed per-question breakdown
- creation timestamp

## 7. Key Interfaces

### Frontend to Backend

- POST /api/auth/create
- POST /api/auth/signin
- GET /api/auth/me
- GET /api/v1/auth/oauth/google
- GET/POST /api/attempts

### Backend to Database

- Mongoose model operations for User and Attempt
- Query by user identity for retrieving a user’s attempts

## 8. Security Design

- Passwords are never stored in plaintext.
- JWTs are issued after successful login and attached to authenticated requests.
- Protected routes are checked using middleware before allowing access.
- OAuth is integrated via Passport.js instead of custom session management.
- CORS is restricted to accepted frontend origins to reduce unauthorized cross-origin access.
- Rate limiting reduces brute-force and abuse risk.

## 9. Scalability and Extensibility

The current architecture is intentionally modular and supports future growth:

- more subjects beyond chemistry
- richer analytics and progress dashboards
- teacher/admin role separation
- additional question banks and difficulty modes
- more protected endpoints if the product grows

## 10. Risks and Considerations

### Technical Risks

- Database connection failure can block authentication and attempt tracking.
- Frontend-only quiz logic can be manipulated if validation is not enforced on the backend.
- OAuth misconfiguration can prevent successful Google sign-in.

### Product Risks

- If the weekly assessment logic is too rigid, users may find the schedule frustrating.
- If the content is too shallow, the educational value may not meet learner expectations.

## 11. High-Level Flow

1. User accesses the app.
2. User signs in or registers.
3. App requests protected content or tests.
4. API validates JWT.
5. Quiz logic is evaluated.
6. Results are saved to MongoDB.
7. Attempt history is shown back to the user.

## 12. Design Summary

Valency is a focused educational platform with a clean three-tier architecture. Its design prioritizes a simple learning journey, secure authentication, topic-based assessments, and durable attempt tracking. The architecture is intentionally straightforward so the product can be extended with more educational features without a major rewrite.
