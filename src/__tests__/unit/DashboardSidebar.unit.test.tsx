import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardSidebar from '@/components/DashboardSidebar';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { usePathname } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: () => ({ push: pushMock }),
}));

jest.mock('@mui/material/useMediaQuery');

describe('DashboardSidebar', () => {
  function renderSidebar(props = {}) {
    const defaultProps = {
      open: true,
      onClose: jest.fn(),
    };

    return render(
      <ThemeProvider theme={theme}>
        <DashboardSidebar {...defaultProps} {...props} />
      </ThemeProvider>,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders sidebar items', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    renderSidebar();

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  test('highlights active route based on pathname', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    (usePathname as jest.Mock).mockReturnValue('/dashboard/users');

    renderSidebar();

    const usersItem = screen.getByRole('button', { name: /users/i });
    expect(usersItem).toHaveClass('Mui-selected');
  });

  test('navigates when sidebar item is clicked', async () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    renderSidebar();

    await userEvent.click(screen.getByText('Users'));

    expect(pushMock).toHaveBeenCalledWith('/dashboard/users');
  });

  test('closes drawer on mobile after navigation', async () => {
    const onCloseMock = jest.fn();

    (useMediaQuery as jest.Mock).mockReturnValue(false); // mobile
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    renderSidebar({ open: true, onClose: onCloseMock });

    await userEvent.click(screen.getByText('Users'));

    expect(pushMock).toHaveBeenCalledWith('/dashboard/users');
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('does not close drawer on desktop', async () => {
    const onCloseMock = jest.fn();

    (useMediaQuery as jest.Mock).mockReturnValue(true); // desktop
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    renderSidebar({ open: true, onClose: onCloseMock });

    await userEvent.click(screen.getByText('Users'));

    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
