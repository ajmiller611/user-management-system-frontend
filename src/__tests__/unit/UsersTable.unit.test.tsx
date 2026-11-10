import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersTable from '@/components/UsersTable';
import { deleteUser, fetchUsers } from '@/lib/api/users';
import { useAuth } from '@/context/AuthContext';

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

const mockAdminAuth = { user: { roles: ['ADMIN'] }, loading: false };
const mockUserAuth = { user: { roles: ['USER'] }, loading: false };

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));
const mockedUseAuth = useAuth as jest.Mock;

const mockedFetchUsers = fetchUsers as jest.MockedFunction<typeof fetchUsers>;
const mockedDeleteUser = deleteUser as jest.MockedFunction<typeof deleteUser>;

const mockUsers = [
  {
    userId: 1,
    username: 'user1',
    email: 'user1@example.com',
  },
];

const mockPagedResponse = {
  data: mockUsers,
  currentPage: 0,
  totalPages: 5,
  totalItems: 47,
};

describe('UsersTable Unit Tests - Admin user', () => {
  beforeEach(() => {
    pushMock.mockClear();
    mockedUseAuth.mockReturnValue(mockAdminAuth);
    mockedFetchUsers.mockResolvedValue(mockPagedResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders title, create and create invitation buttons, and refresh button', async () => {
    render(<UsersTable />);

    expect(await screen.findByText('Users')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Create Invitation' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /refresh/i }),
    ).toBeInTheDocument();

    expect(fetchUsers).toHaveBeenCalledWith(0, 10);
  });

  test('create button navigates to /dashboard/users/register', async () => {
    render(<UsersTable />);

    await userEvent.click(
      await screen.findByRole('button', { name: 'Create' }),
    );

    expect(pushMock).toHaveBeenCalledWith('/dashboard/users/register');
  });

  test('create invitation button navigates to /dashboard/invitations', async () => {
    render(<UsersTable />);

    await userEvent.click(
      await screen.findByRole('button', { name: 'Create Invitation' }),
    );

    expect(pushMock).toHaveBeenCalledWith('/dashboard/invitations');
  });

  test('loads the next page of users when the next page button is clicked', async () => {
    const secondPageResponse = {
      ...mockPagedResponse,
      data: [
        {
          userId: 2,
          username: 'user2',
          email: 'user2@example.com',
        },
      ],
      currentPage: 1,
    };

    mockedFetchUsers
      .mockResolvedValueOnce(mockPagedResponse)
      .mockResolvedValueOnce(secondPageResponse);

    render(<UsersTable />);

    //Wait for the first page to load
    expect(await screen.findByText('user1')).toBeInTheDocument();

    //Navigate to the next page
    const nextPageButton = screen.getByRole('button', { name: /next page/i });
    await userEvent.click(nextPageButton);

    expect(await screen.findByText('user2')).toBeInTheDocument();
  });

  test('loads users with the new page size when the page size is changed', async () => {
    render(<UsersTable />);

    expect(await screen.findByText('user1')).toBeInTheDocument();

    const pageSizeSelector = screen.getByRole('combobox', {
      name: /rows per page/i,
    });
    await userEvent.click(pageSizeSelector);
    await userEvent.click(screen.getByRole('option', { name: '25' }));

    await waitFor(() => {
      expect(mockedFetchUsers).toHaveBeenCalledWith(0, 25);
    });
  });

  test('edit button navigates to edit page for user', async () => {
    render(<UsersTable />);

    await waitFor(() => expect(screen.getByText('user1')).toBeInTheDocument());

    const editButton = screen.getAllByLabelText('Edit');
    await userEvent.click(editButton[0]);

    expect(pushMock).toHaveBeenCalledWith('/dashboard/users/1/edit');
  });

  test('does not delete user when confirmation is cancelled', async () => {
    mockedFetchUsers.mockResolvedValue(mockPagedResponse);
    jest.spyOn(window, 'confirm').mockReturnValue(false);

    render(<UsersTable />);

    const deleteButton = await screen.findByLabelText(/delete/i);
    await userEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockedDeleteUser).not.toHaveBeenCalled();
  });

  test('deletes user when confirmation is accepted', async () => {
    mockedFetchUsers.mockResolvedValue(mockPagedResponse);
    mockedDeleteUser.mockResolvedValue();
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    render(<UsersTable />);

    const deleteButton = await screen.findByLabelText(/delete/i);
    await userEvent.click(deleteButton);

    expect(mockedDeleteUser).toHaveBeenCalledWith(1);
  });

  test('reloads users after successful delete', async () => {
    mockedFetchUsers
      .mockResolvedValueOnce(mockPagedResponse)
      .mockResolvedValueOnce({
        ...mockPagedResponse,
        data: [],
      });

    mockedDeleteUser.mockResolvedValue();
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    render(<UsersTable />);

    const deleteButton = await screen.findByLabelText(/delete/i);
    await userEvent.click(deleteButton);

    expect(fetchUsers).toHaveBeenCalledTimes(2);
  });

  test('shows error message when delete fails', async () => {
    mockedFetchUsers.mockResolvedValue(mockPagedResponse);
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

describe('UsersTable Unit Tests - Non-Admin user', () => {
  beforeEach(() => {
    pushMock.mockClear();
    mockedUseAuth.mockReturnValue(mockUserAuth);
    mockedFetchUsers.mockResolvedValue(mockPagedResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('does not render create button', async () => {
    render(<UsersTable />);

    expect(await screen.findByText('Users')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /create/i }),
    ).not.toBeInTheDocument();
  });

  test('does not render edit or delete buttons', async () => {
    render(<UsersTable />);

    await screen.findByText('user1');

    expect(screen.queryByLabelText(/edit/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/delete/i)).not.toBeInTheDocument();
  });
});
