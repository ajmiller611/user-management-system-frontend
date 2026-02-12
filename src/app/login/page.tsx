'use client';

import LoginForm from '@/components/LoginForm';
import { Box, Typography } from '@mui/material';

export default function LoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        px: 2,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Welcome Back
      </Typography>
      <LoginForm />
    </Box>
  );
}
