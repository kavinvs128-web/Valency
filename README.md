# Learning About Chemistry - Backend (MongoDB)

## Setup

1. Install dependencies

- cd backend
- npm install

2. Configure env

- copy .env.example to .env
- update MONGODB_URI, JWT_SECRET, CORS_ORIGIN

3. Start server

- npm run dev

## Endpoints

- POST /api/auth/create
  Body: { fullName, username, password, confirmPassword, phone, email }

- POST /api/auth/signin
  Body: { email, password }

- GET /api/auth/me
  Header: Authorization: Bearer <token>
