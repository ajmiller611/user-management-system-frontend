/**
 * LoginForm component that renders a login form.
 *
 * The form:
 * - Manages form state using react-hook-form for minimal re-renders
 * - Validates input using Zod schemas
 * - Delegates authentication logic to AuthContext
 * - Displays validation errors and authentication errors to the user
 *
 * This component is responsible only for UI and form handling.
 * All authentication logic, token management, and API communication
 * are handled by AuthContext and the backend API.
 */
'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { loginSchema, LoginInput } from '@/schemas/authSchema';

export default function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState<string>('');

  // Validation rules are in loginSchema to keep validation logic centralized
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // Form submission handler that delegates authentication to AuthContext
  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    setError('');
    try {
      await login(data.username, data.password);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, margin: '0 auto' }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>

      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
    </Box>
  );
}
