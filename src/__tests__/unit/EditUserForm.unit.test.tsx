import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditUserForm from '@/components/EditUserForm';

describe('EditUserForm Component', () => {
  const defaultValues = { username: 'user1', email: 'user1@example.com' };
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  });

  test('renders form with default values', () => {
    render(
      <EditUserForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isLoading={false}
      />,
    );

    expect(screen.getByLabelText(/username/i)).toHaveValue('user1');
    expect(screen.getByLabelText(/email/i)).toHaveValue('user1@example.com');
  });

  test('shows validation errors', async () => {
    render(
      <EditUserForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isLoading={false}
      />,
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, 'ab');
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(/username must be between 3 and 20 characters/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/invalid email address/i),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('calls onSubmit with valid data', async () => {
    render(
      <EditUserForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isLoading={false}
      />,
    );
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitBtn);
    expect(onSubmit).toHaveBeenCalledWith(defaultValues);
  });

  test('submit button disabled when loading', () => {
    render(
      <EditUserForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isLoading
      />,
    );
    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled();
  });
});
