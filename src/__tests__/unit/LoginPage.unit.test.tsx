import { render, screen } from '@testing-library/react';
import LoginPage from '@/app/login/page';

jest.mock('@/components/LoginForm', () => {
  return function MockLoginForm() {
    return <div>Mock Login Form</div>;
  };
});

describe('LoginPage', () => {
  test('renders the welcome message and login form', () => {
    render(<LoginPage />);

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/mock login form/i)).toBeInTheDocument();
  });
});
