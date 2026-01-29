'use client';

import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Grid2,
} from '@mui/material';

/**
 * DashboardPage
 *
 * Root page for the Military Logistics Management System portfolio project.
 * Provides an overview of the project, implemented features, technical stack,
 * and navigation links to detailed sections.
 *
 * Focused on demonstrating full-stack development skills using:
 * - Next.js, React, TypeScript, and MUI on the frontend
 * - Spring Boot, PostgreSQL/H2, and JWT authentication on the backend
 * - User management with CRUD operations and role-based authorization
 */

export default function DashboardPage() {
  return (
    <Container maxWidth="lg">
      {/* Welcome Section */}
      <Box mb={4}>
        <Typography variant="h3" gutterBottom>
          Military Logistics Management System
        </Typography>
        <Typography variant="body1">
          A professional full-stack portfolio project showcasing a user
          management system with authentication, authorization, and CRUD
          functionality.
        </Typography>
      </Box>

      {/* Navigation Links */}
      <Box mb={4}>
        <Typography variant="h5">Navigation</Typography>
        <List>
          {[
            { label: 'About', href: '#about' },
            { label: 'Project Goals', href: '#goals' },
            { label: 'Technical Highlights', href: '#highlights' },
            { label: 'Frontend Tech Stack', href: '#front' },
            { label: 'Backend Tech Stack', href: '#back' },
            { label: 'Documentation & Resources', href: '#docs' },
            { label: 'Contact Me', href: '#contact' },
          ].map((item) => (
            <ListItem key={item.href}>
              <ListItemText>
                <Link href={item.href} color="inherit">
                  {item.label}
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* About Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom id="about">
          About the Project
        </Typography>
        <Typography variant="body1">
          This project demonstrates the ability to build a full-stack web
          application with a focus on user management. It showcases clean code
          practices, API integration, and a professional UI using modern
          frameworks.
        </Typography>
      </Box>

      {/* Project Goals */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom id="goals">
          Project Goals
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="User Management"
              secondary="Implement CRUD functionality for users with proper validation and API integration."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Authentication & Authorization"
              secondary="Secure the application using JWT tokens and role-based access control."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Professional Frontend"
              secondary="Build a clean and responsive UI using Next.js, React, TypeScript, and MUI."
            />
          </ListItem>
        </List>
      </Box>

      {/* Technical Highlights */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom id="highlights">
          Technical Highlights
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="CRUD Operations"
              secondary="Manage users and supplies with full Create, Read, Update, Delete functionality."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Authentication and Authorization"
              secondary="JWT-based authentication with role-based access control."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Testing"
              secondary="Unit, integration, and end-to-end tests implemented using Jest, React Testing Library, and Playwright."
            />
          </ListItem>
        </List>
      </Box>

      {/* Frontend Tech Stack */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom id="front">
          Frontend Tech Stack
        </Typography>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Framework & Language</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Next.js 15 for routing and SSR" />
              </ListItem>
              <ListItem>
                <ListItemText primary="React 19 for component-based UI" />
              </ListItem>
              <ListItem>
                <ListItemText primary="TypeScript for type safety and productivity" />
              </ListItem>
            </List>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">UI & Styling</Typography>
            <List>
              <ListItem>
                <ListItemText primary="MUI (Material-UI) for pre-built components" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Custom CSS modules for additional styling" />
              </ListItem>
            </List>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">State & Data</Typography>
            <List>
              <ListItem>
                <ListItemText primary="React Hook Form + Zod for form validation" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Axios for REST API calls" />
              </ListItem>
            </List>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Testing & QA</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Jest & React Testing Library"
                  secondary="Unit and integration tests for components and pages."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Playwright"
                  secondary="End-to-end tests simulating user workflows."
                />
              </ListItem>
            </List>
          </Grid2>
        </Grid2>
      </Box>

      {/* Backend Tech Stack */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom id="back">
          Backend Tech Stack
        </Typography>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Framework & API</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Spring Boot for REST API development" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Spring Security for authentication and authorization" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Spring Data JPA for database operations" />
              </ListItem>
            </List>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Database</Typography>
            <List>
              <ListItem>
                <ListItemText primary="PostgreSQL for production data" />
              </ListItem>
              <ListItem>
                <ListItemText primary="H2 in-memory database for testing" />
              </ListItem>
            </List>
          </Grid2>
        </Grid2>
      </Box>

      {/* Documentation & Contact */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom id="docs">
          Documentation & Resources
        </Typography>
        <Typography variant="body1">
          API documentation and additional resources can be found in the GitHub
          repository.
        </Typography>
      </Box>

      <Box mb={4}>
        <Typography variant="h4" gutterBottom id="contact">
          Contact Me
        </Typography>
        <Typography variant="body1">Andrew Miller</Typography>
        <Typography variant="body1">
          <Link href="mailto:youremail@example.com">Email</Link>
        </Typography>
        <Typography variant="body1">
          <Link
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
          >
            LinkedIn
          </Link>
        </Typography>
        <Typography variant="body1">
          <Link href="https://github.com/your-github" target="_blank">
            GitHub
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
