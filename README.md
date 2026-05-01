# User Management System (Frontend)

A deployed frontend dashboard for a role-based user management system, built with Next.js, TypeScript, and secure authentication practices.

---

## Overview

This project is a frontend dashboard application that simulates an internal user management system.

- Admin users can perform full CRUD operations
- Regular users have read-only access
- Integrates with a Spring Boot backend for authentication and data

The application mimics patterns commonly found in internal enterprise tools and is designed to showcase frontend architecture, authentication flows, and real-world development practices.

---

## Live Demo

- **Frontend**: https://user-management-frontend-ashy-two.vercel.app
- **Backend API**: https://user-management-backend-6zmq.onrender.com

The backend API may return 401 at root endpoints as authentication is required.

### Demo Credentials

**Admin Access**

- Username: admin
- Password: P@ssword!123

---

## Suggested Reviewer Flow

1. Log in using the admin account
2. Navigate to the Users dashboard
3. Create a new user
4. Edit an existing user
5. Log out and sign in as the newly created user
6. Observe role-based permissions

---

## Tech Stack

### Core

- Next.js 15
- React 19
- TypeScript

### Deployment

- Frontend hosted on Vercel
- Backend hosted on Render
- Database hosted on Neon PostgreSQL

### UI / Frontend

- Material UI (MUI)

### Authentication & Security

- NextAuth.js v5
- JWT-based authentication (via backend)

### Data Fetching

- Axios (custom instance for API communication)

### Forms & Validation

- React Hook Form
- Zod

### Testing

- Jest
- React Testing Library
- Mock Service Worker (MSW)

### Tooling & DevOps

- ESLint
- Prettier
- Husky
- GitHub Actions

---

## Features

- User registration and login
- Role-based access control (ADMIN, USER)
- Protected routes
- Dashboard layout
- Form validation with Zod
- Integration with Spring Boot backend API for authentication and data
- Unit and integration testing

---

## Architecture & Key Concepts

- Separation of concerns through modular folder structure
- Custom Axios instance for centralized API communication
- Form validation using React Hook Form + Zod
- Authentication flow using JWT + refresh tokens via backend
- Route protection enforced based on authentication and user roles
- MSW used to mock API responses for testing

---

## Project Structure

```
src/
  __tests__/
    integration/
    unit/
  app/            # Next.js routes and layouts
  components/     # Reusable UI components
  context/        # React context providers
  lib/            # Utilities (Axios instance, helpers)
  mocks/          # MSW handlers
  schemas/        # Zod validation schemas
  types/          # TypeScript types
  theme.ts        # MUI theme
```

---

## Authentication Flow

1. User submits login credentials
2. Frontend sends credentials to backend API
3. Backend returns:
   - JWT access token
   - Refresh token
4. Frontend establishes an authenticated session and includes the JWT in protected API requests
5. When the access token expires, the refresh token is used automatically to obtain a new JWT

---

## Getting Started

For local development, clone the repository and configure the required environment variables before running the application.

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Access to the companion Spring Boot backend (local or deployed)

### Installation

```bash
git clone https://github.com/ajmiller611/user-management-system-frontend.git
cd user-management-system-frontend
npm install
npm run dev
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and update values as needed:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

---

## Testing Strategy

- Unit tests: Validate individual components and logic
- Integration tests: Verify component interactions and flows
- Mocking: MSW simulates backend responses

```bash
npm test
```

---

## CI/CD

GitHub Actions pipeline:

- Installs dependencies
- Runs tests
- Ensures build passes before merge

---

## Future Improvements

- Expanded role and permission management system
- Performance optimization for large datasets
- End-to-end test coverage for critical user flows

---

## Related Projects

- Backend: https://github.com/ajmiller611/user-management-system-backend

---

## Disclaimer

This project is a portfolio project intended to demonstrate technical skills.

---

## Contact

Andrew J. Miller

- GitHub: https://github.com/ajmiller611
- LinkedIn: https://linkedin.com/in/ajmiller611
- Email: ajmiller611@live.com
