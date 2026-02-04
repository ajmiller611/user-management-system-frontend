import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersTable from '@/components/UsersTable';
import { deleteUser, fetchUsers } from '@/lib/api/users';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock('@/lib/api/users', () => ({
  fetchUsers: jest.fn(),
  deleteUser: jest.fn(),
}));

const mockedFetchUsers = fetchUsers as jest.MockedFunction<typeof fetchUsers>;
const mockedDeleteUser = deleteUser as jest.MockedFunction<typeof deleteUser>;

const mockUsers = [
  {
    userId: 1,
    username: 'user1',
    email: 'user1@example.com',
  },
];

describe('UsersTable Unit Tests', () => {
  beforeEach(() => {
    pushMock.mockClear();
    mockedFetchUsers.mockResolvedValue([
      {
        userId: 1,
        username: 'user1',
        email: 'user1@example.com',
      },
    ]);
  });

  test('renders title, create button, and refresh button', async () => {
    render(<UsersTable />);

    expect(await screen.findByText('Users')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /refresh/i }),
    ).toBeInTheDocument();
  });

  test('create button navigates to /dashboard/users/register', async () => {
    render(<UsersTable />);

    await userEvent.click(
      await screen.findByRole('button', { name: /create/i }),
    );

    expect(pushMock).toHaveBeenCalledWith('/dashboard/users/register');
  });

  test('edit button navigates to edit page for user', async () => {
    render(<UsersTable />);

    await waitFor(() => expect(screen.getByText('user1')).toBeInTheDocument());

    const editButton = screen.getAllByLabelText('Edit');
    await userEvent.click(editButton[0]);

    expect(pushMock).toHaveBeenCalledWith('/dashboard/users/1/edit');
  });

  test('does not delete user when confirmation is cancelled', async () => {
    mockedFetchUsers.mockResolvedValue(mockUsers);
    jest.spyOn(window, 'confirm').mockReturnValue(false);

    render(<UsersTable />);

    const deleteButton = await screen.findByLabelText(/delete/i);
    await userEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockedDeleteUser).not.toHaveBeenCalled();
  });

  test('deletes user when confirmation is accepted', async () => {
    mockedFetchUsers.mockResolvedValue(mockUsers);
    mockedDeleteUser.mockResolvedValue();
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    render(<UsersTable />);

    const deleteButton = await screen.findByLabelText(/delete/i);
    await userEvent.click(deleteButton);

    expect(mockedDeleteUser).toHaveBeenCalledWith(1);
  });

  test('reloads users after successful delete', async () => {
    mockedFetchUsers.mockResolvedValueOnce(mockUsers).mockResolvedValueOnce([]);

    mockedDeleteUser.mockResolvedValue();
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    render(<UsersTable />);

    const deleteButton = await screen.findByLabelText(/delete/i);
    await userEvent.click(deleteButton);

    expect(fetchUsers).toHaveBeenCalledTimes(2);
  });

  test('shows error message when delete fails', async () => {
    mockedFetchUsers.mockResolvedValue(mockUsers);
    mockedDeleteUser.mockRejectedValue(new Error('Failed to delete user'));
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    render(<UsersTable />);

    const deleteButton = await screen.findByLabelText(/delete/i);
    await userEvent.click(deleteButton);

    expect(
      await screen.findByText(/failed to delete user/i),
    ).toBeInTheDocument();
  });
});
