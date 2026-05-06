# User Management System (Frontend)

A production-style Next.js frontend dashboard for a role-based user management system with authentication, admin operations, and full-stack integration.

---

## Engineering Highlights

### Authentication & Security
- JWT-based authentication with refresh token handling (backend-driven)
- Role-based access control (ADMIN / USER)
- Protected routes and session-aware UI rendering

### Frontend Architecture
- Modular Next.js App Router structure
- Centralized API layer using custom Axios instance
- Separation of UI, state, and service logic

### Form & State Management
- Schema-based validation using React Hook Form + Zod
- Controlled form state with reusable validation patterns

### Testing Strategy
- Unit tests for components and utilities
- Integration tests for user flows
- API mocking with MSW for isolated frontend testing

### Deployment & End-to-End System
- Fully integrated with Spring Boot backend (authentication, CRUD operations, admin actions)
- Deployed end-to-end system (Vercel + Render + PostgreSQL)

---

## Live Demo

- **Frontend**: https://user-management-frontend-ashy-two.vercel.app
- **Backend API**: https://user-management-backend-6zmq.onrender.com

The backend API may return 401 at root endpoints as authentication is required.

### Demo Credentials

**Admin Access**

- Username: `admin`
- Password: `admin123`

**User Access**

- Username: `user1`
- Password: `user123`

---

## Tech Stack

### Core

- Next.js 15
- React 19
- TypeScript

### Authentication & Data

- NextAuth.js v5
- JWT (backend-driven auth)
- Axios (custom client)

### UI & Forms

- Material UI (MUI)
- React Hook Form
- Zod

### Testing

- Jest
- React Testing Library
- Mock Service Worker (MSW)

### DevOps

- Vercel deployment
- GitHub Actions CI
- ESLint, Prettier, Husky

---

## Features

- Full CRUD user management (admin-only)
- Role-based protected routes
- Persistent authentication via JWT
- Form validation for user inputs
- Admin demo reset system integration

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
AUTH_SECRET=your-nextauth-secret
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
