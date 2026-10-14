# Product Requirements Document (PRD)

## 1. Product Overview

Valency is a chemistry learning platform designed for students preparing for foundational chemistry topics such as oxidation and reduction, gaseous state, and organic reaction concepts. The product combines structured study content, timed quiz experiences, and persistent progress tracking to create a learning loop that is engaging, measurable, and competitive.

The product is implemented as a full-stack web app with:

- React-based frontend for the student experience
- Express.js backend for API logic and authentication
- MongoDB Atlas for persistence
- JWT-based sessions and Google OAuth for account access

## 2. Problem Statement

Students often struggle to stay consistent with chemistry preparation because learning resources are fragmented across notes, videos, worksheets, and quizzes. There is no single platform that combines:

- lesson content,
- topic-wise practice tests,
- exam-style timed assessments,
- performance history,
- and reliable user authentication.

Valency addresses this by consolidating these experiences into a single student-focused product.

## 3. Product Goals

### Primary Goals

- Help students learn chemistry through structured content and guided pathways.
- Improve retention through quizzes and practice opportunities.
- Encourage regular study by supporting weekly assessment cycles.
- Track student performance over time using saved attempts.

### Secondary Goals

- Support both local email/password sign-in and Google OAuth.
- Make the learning experience feel modern and interactive.
- Keep the product lightweight and easy to deploy locally or in a cloud environment.

## 4. Target Users

### Primary User: School/college chemistry learner

- Age range: 15–22
- Needs: revision support, topic understanding, score tracking, weekly assessment readiness
- Behavior: prefers simple, visual interfaces and repeatable learning flows

### Secondary User: Tutor or educator

- May review student performance and quiz outcomes indirectly through stored attempts

## 5. Core User Journeys

### 5.1 Account Creation and Sign-In

1. User lands on the app and chooses to create an account or sign in.
2. User registers with email/password or continues with Google.
3. System validates credentials and returns a JWT.
4. User is redirected to home or dashboard.

### 5.2 Browse Study Content

1. User navigates to learning sections such as Live Books and topic pages.
2. User reads chemistry lessons and explores concept explanations.
3. User can continue to related exercises or quizzes.

### 5.3 Weekly Test Flow

1. User opens the Weekly Test area.
2. User selects a topic test or practice mode.
3. A timer begins based on quiz type and time restrictions.
4. User answers questions and submits the attempt.
5. System calculates score and saves the attempt.
6. User reviews results and performance breakdown.

### 5.4 Attempts History

1. User views saved attempts in the Attempts Corner.
2. User sees assessment name, score, date, and accuracy metrics.
3. User can reflect on historical performance and identify weak topics.

## 6. Functional Requirements

### 6.1 Authentication and Access

- The system must allow user registration using email and password.
- The system must validate password confirmation during account creation.
- The system must support sign-in with JWT-based session tokens.
- The system must support Google OAuth login.
- Protected routes must enforce authentication before access.

### 6.2 User Experience and Navigation

- The frontend must support a landing screen and authentication flow.
- The frontend must show a home dashboard after successful login.
- The interface must provide a theme toggle with persisted user preference.
- Users must be able to navigate through learning pages without losing context.

### 6.3 Learning Content

- The platform must contain chemistry content modules for foundational learning topics.
- Lessons should be structured in a readable and visual manner.
- Topic-based pages must be accessible from the main learning journey.

### 6.4 Quiz/Assessment System

- The app must provide weekly assessment cards for core chemistry topics.
- The app must support a Sunday-locked weekly test cycle.
- The app must provide a practice mode for unlocked or restricted scenarios.
- The app must enforce a timer for timed assessments.
- The app must prevent users from resuming or revisiting previous answers mid-attempt.

### 6.5 Attempt Persistence

- Every completed quiz attempt must be stored in MongoDB.
- Each attempt must include:
  - user identity
  - assessment name
  - score
  - percentage score
  - question-by-question breakdown
- The system must allow retrieval of a user’s full attempt history.

### 6.6 Analytics and Review

- Users must see aggregate attempt information such as score and best score.
- Users must review answer-by-answer explanations and correctness.
- The app should surface the difference between practice and scored attempts.

## 7. Non-Functional Requirements

### Performance

- Frontend should load key views quickly with lazy loading for page modules.
- API responses should remain under typical local-network latency expectations.

### Security

- Passwords must be hashed before storage.
- JWT tokens must be used for protected API access.
- HTTP headers must be hardened using Helmet.
- Rate limiting must prevent abuse.
- CORS must be restricted to allowlisted frontend origins.

### Reliability

- The app must handle invalid requests with clear 404 and 500 responses.
- The backend must gracefully fail on database or authentication errors.

### Maintainability

- Code should be organized by routes/controllers/models in backend.
- Frontend page logic should remain modular with separate CSS files by feature.

## 8. Success Metrics

- Users successfully create accounts and sign in.
- Users complete weekly tests and save attempts.
- Users revisit the app and view prior performance records.
- Quiz completion flow is smooth and free of user confusion.
- Authentication failure or invalid attempts are handled without crashes.

## 9. Constraints and Assumptions

- The platform is initially focused on a single-user web experience rather than a multi-tenant LMS.
- The app depends on MongoDB Atlas for persistence.
- The UI is built as a client-rendered frontend and does not rely on server-side rendering.
- Initial content is chemistry-focused and aligned with school-level conceptual learning.

## 10. MVP Scope

The MVP includes:

- Email/password and Google sign-in
- Learning pages and lesson browsing
- Weekly test module with topic-specific quizzes
- Practice mode and timed attempt flow
- Attempt persistence and review screen
- Attempts history for the logged-in user
- Theme toggle and responsive presentation

## 11. Out of Scope for MVP

- Full teacher/admin dashboards
- Advanced analytics and cohort reporting
- Real-time multiplayer competition features
- Payment or subscription billing
- Mobile native app

## 12. Acceptance Criteria

- A user can create an account and log in successfully.
- A logged-in user can access protected pages only after valid authentication.
- The weekly test page shows topic cards and a countdown with Sunday locking logic.
- A user can complete a quiz in practice mode and see results.
- Attempt data is stored in MongoDB and displayed in the attempts history.
- The frontend handles the OAuth callback and logs the user in without manual token entry.

## 13. Summary

Valency is a chemistry-focused, full-stack e-learning platform for students who want to study, practice, and assess their understanding in one place. The product emphasizes clarity, regularity, and measurable progress through quizzes and attempt tracking while remaining modular enough to extend with more subjects and learning features in the future.
