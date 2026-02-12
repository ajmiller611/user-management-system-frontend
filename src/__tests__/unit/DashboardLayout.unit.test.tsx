import { render, screen } from '@testing-library/react';
import DashboardLayout from '@/app/dashboard/layout';
import React from 'react';

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/dashboard'),
}));

describe('DashboardLayout', () => {
  test('renders children inside the main content area', () => {
    render(
      <DashboardLayout>
        <div>Page Content</div>
      </DashboardLayout>,
    );

    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  test('renders header and sidebar components', () => {
    render(
      <DashboardLayout>
        <div>Page Content</div>
      </DashboardLayout>,
    );

    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument();
  });
});
