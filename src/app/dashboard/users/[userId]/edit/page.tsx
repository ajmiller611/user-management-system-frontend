'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import axios from 'axios';
import EditUserForm from '@/components/EditUserForm';
import { EditUserInput } from '@/schemas/userSchema';

// Shape of user data returned by the backend for edit operations
interface UserResponse {
  userId: number;
  username: string;
  email: string;
}

/**
 * Edit User page
 * - Fetches user details by ID
 * - Pre-populates edit form
 * - Submits updates to backend
 */
export default function EditUserPage() {
  const { userId } = useParams<{ userId: string }>();
  const router = useRouter();

  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState<Record<string, string>>({});

  // Load user data when page is accessed or userId changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        console.log(response);
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setApiResponse({
          error: 'Failed to load user data.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Submit updated user details and return to users list on success
  const handleUpdateUser = async (data: EditUserInput) => {
    setIsLoading(true);
    setApiResponse({});

    try {
      await axiosInstance.put(`/users/${userId}`, data);
      router.push('/dashboard/users');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error updating user:', error.response.data);
          setApiResponse({
            error: 'Failed to update user. Please check your input.',
          });
        } else {
          console.error('No response received:', error.message);
          setApiResponse({
            error: 'Server error. Please try again later.',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state while fetching user data
  if (isLoading && !user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // User not found or failed fetch
  if (!user) {
    return (
      <Box>
        <Typography color="error">User not found.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <EditUserForm
        defaultValues={{
          username: user.username,
          email: user.email,
        }}
        onSubmit={handleUpdateUser}
        isLoading={isLoading}
        apiResponse={apiResponse}
      />
    </Box>
  );
}
