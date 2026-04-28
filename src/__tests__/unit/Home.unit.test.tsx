import { render, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

jest.mock('@/context/AuthContext');
jest.mock('next/navigation');

describe('Root Page Redirect Logic', () => {
  const replaceMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
    });
  });

  test('redirects unauthenticated users to login', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<Home />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/login');
    });
  });

  test('redirects authenticated users to dashboard', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { roles: ['USER'] },
      loading: false,
    });

    render(<Home />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('does not redirect while loading', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(<Home />);

    expect(replaceMock).not.toHaveBeenCalled();
  });
});
