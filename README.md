# User Management System (Frontend)

Frontend for a role-based user management system, showcasing modern development with Next.js, TypeScript, and secure authentication.

---

## Overview

This project is a frontend dashboard application that simulates an internal user management system.

- Admin users can perform full CRUD operations
- Regular users have read-only access
- Integrates with a Spring Boot backend for authentication and data

The application mimics patterns commonly found in internal enterprise tools and is designed to showcase frontend architecture, authentication flows, and real-world development practices.

---

## Tech Stack

### Core

- Next.js 15
- React 19
- TypeScript

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

## Demo

These users are automatically seeded by the backend on application startup for demonstration purposes.

- Admin User:

  - Email: admin@demo.com
  - Password: Admin123!

- Regular User:
  - Email: user@demo.com
  - Password: User123!

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
4. Frontend includes JWT in authenticated requests
5. When expired, refresh token is used to obtain a new JWT

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Running Spring Boot backend

### Installation

```bash
git clone https://github.com/ajmiller611/user-management-system-frontend.git
cd user-management-system-frontend
```

```bash
npm install
```

### Run Application

```bash
npm run dev
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

## Environment Variables

Create a `.env` file and configure the following:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

A `.env.example` file is provided as a reference configuration.

---

## Future Improvements

- Deployment
- Code coverage reporting
- Improved UI/UX

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
