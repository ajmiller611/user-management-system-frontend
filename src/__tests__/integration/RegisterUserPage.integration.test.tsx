import { render, screen, waitFor } from '@testing-library/react';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';
import RegisterUserPage from '@/app/dashboard/users/register/page';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const apiEndpoint = '*/users';

describe('RegisterUserPage Integration Tests', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  const fillAndSubmitForm = async () => {
    await userEvent.type(screen.getByLabelText(/username/i), 'testUser');
    await userEvent.type(screen.getByLabelText(/password/i), 'Test@1234');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  };

  test('successfully registers a user and redirects', async () => {
    render(<RegisterUserPage />);

    await fillAndSubmitForm();

    await waitFor(() => {
      expect(
        screen.getByText(/User created successfully/i),
      ).toBeInTheDocument();
    });

    expect(pushMock).toHaveBeenCalledWith('/dashboard/users');
  });

  test('shows username conflict error (409)', async () => {
    server.use(
      http.post(apiEndpoint, async () => {
        return HttpResponse.json(
          { message: 'Username already taken' },
          { status: 409 },
        );
      }),
    );

    render(<RegisterUserPage />);

    await fillAndSubmitForm();

    await waitFor(() => {
      expect(screen.getByText(/Username already taken/i)).toBeInTheDocument();
    });

    expect(pushMock).not.toHaveBeenCalled();
  });

  test('shows validation error (400)', async () => {
    server.use(
      http.post(apiEndpoint, async () => {
        return HttpResponse.json({ message: 'Invalid input' }, { status: 400 });
      }),
    );

    render(<RegisterUserPage />);

    await fillAndSubmitForm();

    await waitFor(() => {
      expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    });

    expect(pushMock).not.toHaveBeenCalled();
  });

  test('shows generic server error for unexpected status', async () => {
    server.use(
      http.post(apiEndpoint, async () => {
        return HttpResponse.json({ message: 'Server error' }, { status: 500 });
      }),
    );

    render(<RegisterUserPage />);

    await fillAndSubmitForm();

    await waitFor(() => {
      expect(screen.getByText(/please try again later/i)).toBeInTheDocument();
    });

    expect(pushMock).not.toHaveBeenCalled();
  });
});
