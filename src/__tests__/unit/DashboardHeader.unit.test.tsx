import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardHeader from '@/components/DashboardHeader';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

describe('DashboardHeader', () => {
  function renderHeader(props = {}) {
    const defaultProps = {
      title: 'Dashboard',
      showMenuButton: true,
      onMenuClick: jest.fn(),
      onLogout: jest.fn(),
    };

    return render(
      <ThemeProvider theme={theme}>
        <DashboardHeader {...defaultProps} {...props} />
      </ThemeProvider>,
    );
  }

  test('renders the title', () => {
    renderHeader();

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('renders menu button when showMenuButton is true', () => {
    renderHeader({ showMenuButton: true });

    const menuButton = screen.getByLabelText(/open navigation menu/i);
    expect(menuButton).toBeInTheDocument();
  });

  test('does not render menu button when showMenuButton is false', () => {
    renderHeader({ showMenuButton: false });

    expect(
      screen.queryByLabelText(/open navigation menu/i),
    ).not.toBeInTheDocument();
  });

  test('calls onMenuClick when menu button is clicked', async () => {
    const onMenuClick = jest.fn();

    renderHeader({ onMenuClick });

    const menuButton = screen.getByLabelText(/open navigation menu/i);
    await userEvent.click(menuButton);

    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  test('calls onLogout when logout button is clicked', async () => {
    const onLogout = jest.fn();

    renderHeader({ onLogout });

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await userEvent.click(logoutButton);

    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
