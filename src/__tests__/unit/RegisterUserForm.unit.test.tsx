import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateUserForm from '@/components/CreateUserForm';

describe('CreateUserForm', () => {
  test('renders form with username, password, and email inputs', () => {
    render(<CreateUserForm onSubmit={() => {}} isLoading={false} />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test('displays API error messages when apiResponse contains errors', () => {
    const apiResponse = {
      username: 'Username already taken',
      password: 'Password is too weak',
      email: 'Email already exists',
      error: 'Form submission failed',
    };

    render(
      <CreateUserForm
        onSubmit={() => {}}
        apiResponse={apiResponse}
        isLoading={false}
      />,
    );

    expect(screen.getByText(/username already taken/i)).toBeInTheDocument();
    expect(screen.getByText(/password is too weak/i)).toBeInTheDocument();
    expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
    expect(screen.getByText(/form submission failed/i)).toBeInTheDocument();
  });

  test('displays success message when apiResponse.success is provided', () => {
    const apiResponse = {
      success: 'User created successfully',
    };

    render(
      <CreateUserForm
        onSubmit={() => {}}
        apiResponse={apiResponse}
        isLoading={false}
      />,
    );

    expect(screen.getByText(/user created successfully/i)).toBeInTheDocument();
  });

  test('disables submit buttons and shows loading text when isLoading is true', () => {
    render(<CreateUserForm onSubmit={() => {}} isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/submitting/i);
  });

  test('calls onSubmit when form is submitted with valid data', async () => {
    const handleSubmit = jest.fn();

    render(<CreateUserForm onSubmit={handleSubmit} isLoading={false} />);

    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(screen.getByLabelText(/password/i), 'Test@1234');
    await userEvent.type(
      screen.getByLabelText(/email/i),
      'testuser@example.com',
    );
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'Test@1234',
      email: 'testuser@example.com',
    });
  });
});
