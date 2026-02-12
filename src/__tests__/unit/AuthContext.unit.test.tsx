import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import axiosInstance, { setAccessToken } from '@/lib/axiosInstance';
import { useRouter } from 'next/navigation';

jest.mock('@/lib/axiosInstance');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AuthContext', () => {
  function TestComponent() {
    const { user, loading, login, logout } = useAuth();

    return (
      <div>
        <div>Loading: {loading ? 'true' : 'false'}</div>
        <div>User: {user ? user.username : 'none'}</div>

        <button onClick={() => login('testuser', 'password')}>Login</button>

        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  test('restores session on mount', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (axiosInstance.post as jest.Mock).mockResolvedValueOnce({
      headers: { authorization: 'Bearer test-token' },
    });

    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({
      data: {
        userId: 1,
        username: 'restoredUser',
        email: 'test@test.com',
        roles: ['USER'],
      },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() =>
      expect(screen.getByText(/restoredUser/i)).toBeInTheDocument(),
    );

    expect(setAccessToken).toHaveBeenCalledWith('test-token');
  });

  test('logs in and redirects to dashboard', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (axiosInstance.post as jest.Mock)
      .mockRejectedValueOnce(new Error('No session')) // restoreSession
      .mockResolvedValueOnce({
        headers: { authorization: 'Bearer login-token' },
        data: {
          userId: 2,
          username: 'testuser',
          email: 'test@test.com',
          roles: ['USER'],
        },
      });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await userEvent.click(screen.getByText(/login/i));

    await waitFor(() =>
      expect(screen.getByText(/testuser/i)).toBeInTheDocument(),
    );

    expect(setAccessToken).toHaveBeenCalledWith('login-token');
    expect(pushMock).toHaveBeenCalledWith('/dashboard');
  });

  test('logs out and redirects to login', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    (axiosInstance.post as jest.Mock).mockResolvedValueOnce({});

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await userEvent.click(screen.getByText(/logout/i));

    await waitFor(() => {
      expect(setAccessToken).toHaveBeenCalledWith(null);
      expect(pushMock).toHaveBeenCalledWith('/login');
    });
  });

  test('throws error when useAuth used outside provider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useAuth must be used within an AuthProvider',
    );

    consoleError.mockRestore();
  });
});
