import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import UsersTable from '@/components/UsersTable';
import { type LogisticsUser } from '@/types/LogisticsUser';
import { api } from '@/mocks/api';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const mockUsers: LogisticsUser[] = [
  { userId: 1, username: 'user1', email: 'user1@example.com' },
  { userId: 2, username: 'user2', email: 'user2@example.com' },
];

describe('UsersTable Integration Tests', () => {
  beforeEach(() => {
    pushMock.mockClear();

    server.use(
      http.get(api.users(), async () => {
        return HttpResponse.json({
          status: 'success',
          message: 'Users fetched successfully',
          data: {
            currentPage: 1,
            totalPages: 1,
            totalItems: mockUsers.length,
            data: mockUsers,
          },
        });
      }),
    );
  });

  test('fetches and displays users in the table', async () => {
    render(<UsersTable />);

    for (const user of mockUsers) {
      await waitFor(() => {
        expect(screen.getByText(user.username)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
      });
    }
  });

  test('shows error message when fetching users fails', async () => {
    server.use(
      http.get(api.users(), async () => {
        return HttpResponse.json({ message: 'server error' }, { status: 500 });
      }),
    );

    render(<UsersTable />);

    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });

  test('refresh button reloads the users', async () => {
    render(<UsersTable />);

    const refreshButton = screen.getByRole('button', { name: /refresh/i });

    await userEvent.click(refreshButton);

    for (const user of mockUsers) {
      await waitFor(() => {
        expect(screen.getByText(user.username)).toBeInTheDocument();
      });
    }
  });

  test('renders edit and delete buttons for each user row', async () => {
    render(<UsersTable />);

    await waitFor(() => {
      Array.from({ length: mockUsers.length }).forEach(() => {
        expect(screen.getAllByLabelText('Edit')[0]).toBeInTheDocument();
        expect(screen.getAllByLabelText('Delete')[0]).toBeInTheDocument();
      });
    });
  });
});
