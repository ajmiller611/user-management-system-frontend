/**
 * Form component for editing an existing user.
 *
 * Receives initial user data from the parent and submits
 * updated values without owning persistence logic.
 */
import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  Grid2,
  OutlinedInput,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { editUserSchema, EditUserInput } from '@/schemas/userSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormGrid = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

type Props = {
  /** Initial values loaded from backend for editing */
  defaultValues: { username: string; email: string };
  /** Submit handler provided by page-level component */
  onSubmit: SubmitHandler<EditUserInput>;
  /** Indicates whether a submission is in progress */
  isLoading: boolean;
  /** Server-side validation or API errors mapped by field */
  apiResponse?: Record<string, string>;
};

export default function EditUserForm({
  defaultValues,
  onSubmit,
  apiResponse,
  isLoading,
}: Readonly<Props>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserInput>({
    resolver: zodResolver(editUserSchema),
    defaultValues,
  });

  // Forward validated form data to parent submit handler
  const handleFormSubmit: SubmitHandler<EditUserInput> = (data) => {
    onSubmit(data);
  };

  return (
    <Box
      component="form"
      aria-label="user edit form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {apiResponse?.success && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {apiResponse.success}
        </Typography>
      )}

      {apiResponse?.error && (
        <FormHelperText error sx={{ mb: 2 }}>
          {apiResponse.error}
        </FormHelperText>
      )}

      <Grid2 container spacing={2}>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="username" required>
            Username
          </FormLabel>
          <OutlinedInput
            id="username"
            type="text"
            required
            size="small"
            autoFocus
            {...register('username')}
          />
          {errors.username && (
            <FormHelperText error>
              {(errors.username as { message: string }).message}
            </FormHelperText>
          )}
          {apiResponse?.username && (
            <FormHelperText error>{apiResponse.username}</FormHelperText>
          )}
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <OutlinedInput
            id="email"
            type="email"
            required
            size="small"
            {...register('email')}
          />
          {errors.email && (
            <FormHelperText error>
              {(errors.email as { message: string }).message}
            </FormHelperText>
          )}
          {apiResponse?.email && (
            <FormHelperText error>{apiResponse.email}</FormHelperText>
          )}
        </FormGrid>
      </Grid2>
      <Button
        variant="contained"
        type="submit"
        endIcon={<SendIcon />}
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  );
}
