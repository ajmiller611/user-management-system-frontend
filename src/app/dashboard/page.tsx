'use client';

import {
  Container,
  Grid2,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Link,
  Divider,
} from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <header>
        <Box mb={5}>
          <Typography variant="h3" gutterBottom>
            User Management System
          </Typography>
          <Typography variant="body1">
            A full-stack portfolio project demonstrating secure authentication,
            role-based access control, administrative workflows, and
            production-style engineering practices.
          </Typography>
        </Box>

        <Box mb={5}>
          <Typography variant="h5" gutterBottom>
            Navigation
          </Typography>
          <List>
            <ListItem>
              <ListItemText>
                <Link href="#overview" color="inherit">
                  Project Overview
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link href="#highlights" color="inherit">
                  Technical Highlights
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link href="#frontend" color="inherit">
                  Frontend Stack
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link href="#backend" color="inherit">
                  Backend Stack
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link href="#architecture" color="inherit">
                  Architecture
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link href="#testing" color="inherit">
                  Testing & CI/CD
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link href="#goals" color="inherit">
                  Project Goals
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </header>

      <Divider sx={{ mb: 4 }} />

      <section id="overview">
        <Typography variant="h4" gutterBottom>
          Project Overview
        </Typography>
        <Typography variant="body1" paragraph>
          This application simulates an internal enterprise user management
          platform. It provides role-based access control where administrators
          can perform full CRUD operations, while standard users have restricted
          read-only access.
        </Typography>
        <Typography variant="body1" paragraph>
          The system is built as a separated full-stack architecture with a
          Next.js frontend and Spring Boot backend, designed to demonstrate
          real-world authentication flows, secure API integration, and scalable
          software structure.
        </Typography>
      </section>

      <section id="highlights">
        <Typography variant="h4" gutterBottom>
          Technical Highlights
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Secure authentication with JWT access tokens and refresh token workflow" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Role-based authorization for ADMIN and USER access levels" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Administrative dashboard with protected CRUD functionality" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Production-style testing strategy with unit and integration coverage" />
          </ListItem>
          <ListItem>
            <ListItemText primary="CI pipeline for automated validation before merge" />
          </ListItem>
        </List>
      </section>

      <section id="frontend">
        <Typography variant="h4" gutterBottom>
          Frontend Stack
        </Typography>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Core Technologies</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Next.js 15 with App Router" />
              </ListItem>
              <ListItem>
                <ListItemText primary="React 19" />
              </ListItem>
              <ListItem>
                <ListItemText primary="TypeScript" />
              </ListItem>
            </List>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Frontend Engineering</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Material UI for dashboard interface" />
              </ListItem>
              <ListItem>
                <ListItemText primary="React Hook Form + Zod validation" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Axios-based API communication" />
              </ListItem>
            </List>
          </Grid2>
        </Grid2>
      </section>

      <section id="backend">
        <Typography variant="h4" gutterBottom>
          Backend Stack
        </Typography>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Core Technologies</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Java 21 + Spring Boot" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Spring Security + OAuth2 Resource Server" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Spring Data JPA" />
              </ListItem>
            </List>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography variant="h6">Infrastructure</Typography>
            <List>
              <ListItem>
                <ListItemText primary="PostgreSQL + H2" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Docker Compose" />
              </ListItem>
              <ListItem>
                <ListItemText primary="GitHub Actions + SonarCloud" />
              </ListItem>
            </List>
          </Grid2>
        </Grid2>
      </section>

      <section id="architecture">
        <Typography variant="h4" gutterBottom>
          Architecture
        </Typography>
        <Typography variant="body1" paragraph>
          The frontend follows a modular structure with reusable components,
          centralized API handling, and protected routing. The backend applies a
          layered architecture with clear separation between controllers,
          services, and repositories.
        </Typography>
        <Typography variant="body1" paragraph>
          Together, both applications model production-style engineering
          practices including authentication lifecycle management, secure data
          exchange, validation, and maintainable code organization.
        </Typography>
      </section>

      <section id="testing">
        <Typography variant="h4" gutterBottom>
          Testing & CI/CD
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Frontend unit and integration tests with Jest, Testing Library, and MSW" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Backend unit and integration tests with H2 and PostgreSQL" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Automated GitHub Actions workflows for build and validation" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Code quality enforcement with ESLint, Prettier, Husky, Checkstyle, and SonarCloud" />
          </ListItem>
        </List>
      </section>

      <section id="goals">
        <Typography variant="h4" gutterBottom>
          Project Goals
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Demonstrate full-stack engineering capability across frontend and backend systems" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Showcase secure authentication and authorization design" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Apply professional development workflows and testing strategy" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Build a portfolio-ready project aligned with production standards" />
          </ListItem>
        </List>
      </section>
    </Container>
  );
}
