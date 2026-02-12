import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('LoginForm', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form fields and buttons', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    render(<LoginForm />);

    userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findAllByText(/required/i)).toHaveLength(2);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test('calls login with form values on submit', async () => {
    mockLogin.mockResolvedValue(undefined);

    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });

  test('displays error message when login fails', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');

    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });
});
