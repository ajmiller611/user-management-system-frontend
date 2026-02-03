import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersTable from '@/components/UsersTable';
import { fetchUsers } from '@/lib/api/users';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock('@/lib/api/users', () => ({
  fetchUsers: jest.fn(),
}));

const mockedFetchUsers = fetchUsers as jest.MockedFunction<typeof fetchUsers>;

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
});
