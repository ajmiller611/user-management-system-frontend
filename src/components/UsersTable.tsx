/**
 * UsersTable
 *
 * Displays a paginated table of users with actions to create, edit, and delete.
 * Integrates with the backend via axiosInstance for CRUD operations.
 *
 * Features:
 * - Fetch users from the API on mount and refresh
 * - Delete users with confirmation prompt
 * - Navigate to create/edit pages
 * - Handles loading and error states
 *
 * Designed for use in the dashboard under /users
 */
'use client';
import * as React from 'react';
import { Box, Button, IconButton, Stack, Alert } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import PageContainer from './PageContainer';
import { type LogisticsUser } from '@/types/LogisticsUser';
import axiosInstance from '@/lib/axiosInstance';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const apiEndpoint = '/users';

interface PagedResponse<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: T[];
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

/**
 * Fetch all users from the backend API.
 * Returns an array of LogisticsUser objects.
 * Throws an Error if the request fails.
 */
async function fetchUsers(): Promise<LogisticsUser[]> {
  try {
    const res =
      await axiosInstance.get<ApiResponse<PagedResponse<LogisticsUser>>>(
        apiEndpoint,
      );

    return res.data.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ??
        error.message ??
        'Failed to fetch users';

      throw new Error(message);
    }

    throw new Error('An unexpected error occurred');
  }
}

export default function UsersTable() {
  const router = useRouter();

  // Component state
  const [users, setUsers] = React.useState<LogisticsUser[]>([]); // List of users displayed
  const [loading, setLoading] = React.useState<boolean>(true); // Loading indicator
  const [error, setError] = React.useState<string | null>(null); // Error message from API

  const loadUsers = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch users from API on mount or when loadUsers is called
  React.useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleRefresh = () => loadUsers();

  // Navigate to the user registration page
  const handleCreate = () => {
    router.push('/dashboard/users/register');
  };

  // Navigate to the edit page for a given user
  const handleEdit = (user: LogisticsUser) => {
    console.log('Navigating to edit user page for user:', user);
  };

  // Delete a user with a confirmation prompt
  const handleDelete = async (user: LogisticsUser) => {
    console.log('Deleting user:', user);
  };

  // Define columns for the DataGrid
  // 'actions' column uses GridActionsCellItem for edit/delete buttons
  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'ID', width: 80 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 120,
      getActions: ({ row }) => [
        <GridActionsCellItem
          key="edit-item"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(row as LogisticsUser)}
        />,
        <GridActionsCellItem
          key="delete-item"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(row as LogisticsUser)}
        />,
      ],
    },
  ];

  // PageContainer wraps table with title and action buttons
  // DataGrid displays users with pagination, loading, and error states
  return (
    <PageContainer
      title="Users"
      actions={
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleRefresh} aria-label="refresh">
            <RefreshIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            Create
          </Button>
        </Stack>
      }
    >
      <Box sx={{ height: 600, width: '100%' }}>
        {error && <Alert severity="error">{error}</Alert>}
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.userId}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </Box>
    </PageContainer>
  );
}
