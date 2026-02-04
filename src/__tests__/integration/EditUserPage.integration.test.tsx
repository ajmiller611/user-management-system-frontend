import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditUserPage from '@/app/dashboard/users/[userId]/edit/page';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({ userId: '1' }),
  useRouter: () => ({
    push: pushMock,
  }),
}));

const apiEndpoint = '*/users/:userId';

describe('Edit User Page Integration Tests', () => {
  test('shows loading state while fetching user', async () => {
    render(<EditUserPage />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await screen.findByLabelText(/username/i);
  });

  test('fetches user and renders form with default values', async () => {
    render(<EditUserPage />);

    const usernameInput = await screen.findByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);

    expect(usernameInput).toHaveValue('user1');
    expect(emailInput).toHaveValue('user1@example.com');
  });

  test('shows error when user fetch fails', async () => {
    server.use(
      http.get(apiEndpoint, () => {
        return HttpResponse.error();
      }),
    );

    render(<EditUserPage />);

    expect(await screen.findByText(/user not found/i)).toBeInTheDocument();
  });

  test('submits updated user and redirects on success', async () => {
    const user = userEvent.setup();

    render(<EditUserPage />);

    const usernameInput = await screen.findByLabelText(/username/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.clear(usernameInput);
    await user.type(usernameInput, 'updatedUser');
    await user.click(submitButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/dashboard/users');
    });
  });

  test('shows error message when update fails', async () => {
    server.use(
      http.put(apiEndpoint, () => {
        return HttpResponse.json({ message: 'Update failed' }, { status: 400 });
      }),
    );

    const user = userEvent.setup();

    render(<EditUserPage />);

    const submitButton = await screen.findByRole('button', { name: /submit/i });

    await user.click(submitButton);

    expect(
      await screen.findByText(/failed to update user/i),
    ).toBeInTheDocument();

    expect(pushMock).not.toHaveBeenCalled();
  });
});
