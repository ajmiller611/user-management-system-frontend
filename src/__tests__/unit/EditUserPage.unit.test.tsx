import { render, screen } from '@testing-library/react';
import EditUserPage from '@/app/dashboard/users/[userId]/edit/page';
import { useAuth, AuthUser } from '@/context/AuthContext';

jest.mock('@/context/AuthContext');

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const adminUser: AuthUser = {
  userId: 1,
  username: 'admin',
  email: 'admin@example.com',
  roles: ['ADMIN'],
};

const regularUser: AuthUser = {
  userId: 2,
  username: 'user',
  email: 'email@email.com',
  roles: ['USER'],
};

const replaceMock = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({ userId: '1' }),
  useRouter: () => ({
    push: jest.fn(),
    replace: replaceMock,
  }),
}));

describe('EditUserPage Unit Tests', () => {
  test('renders page for ADMIN users', async () => {
    mockedUseAuth.mockReturnValue({
      user: adminUser,
      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<EditUserPage />);

    expect(await screen.findByLabelText(/username/i)).toBeInTheDocument();
  });

  test('does not render form for non-admin users and redirects', () => {
    mockedUseAuth.mockReturnValue({
      user: regularUser,
      loading: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    const { container } = render(<EditUserPage />);
    expect(container).toBeEmptyDOMElement();
    expect(replaceMock).toHaveBeenCalledWith('/dashboard/users');
  });
});
