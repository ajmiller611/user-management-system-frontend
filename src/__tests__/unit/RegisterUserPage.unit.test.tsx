import { render, screen } from '@testing-library/react';
import RegisterUserPage from '@/app/dashboard/users/register/page';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('RegisterUserPage', () => {
  test('renders the RegisterUserForm component', () => {
    render(<RegisterUserPage />);

    expect(
      screen.getByRole('form', { name: 'user registration form' }),
    ).toBeInTheDocument();
  });
});
