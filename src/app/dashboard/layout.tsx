/**
 * DashboardLayout
 *
 * Root layout for all /dashboard routes.
 *
 * Provides:
 * - Responsive header with optional menu button
 * - Sidebar (permanent on desktop, temporary drawer on mobile)
 * - Main content area for page components
 *
 * Handles mobile drawer toggling and ensures proper layout spacing
 * to prevent content being hidden under the AppBar.
 */
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import axiosInstance from '@/lib/axiosInstance';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

type DashboardLayoutProps = {
  children?: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  const router = useRouter();
  const theme = useTheme();
  const { logout } = useAuth();

  // Controls visibility of the sidebar on mobile screens
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState<boolean>(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const handleToggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleResetDemo = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset the demo? This will delete and recreate all demo data.'
    );
    if (!confirmed) {
      return;
    }
    try {
      await axiosInstance.post('/admin/demo/reset');

      logout();

      router.push('/login');
    } catch (error) {
      console.error('Reset demo failed:', error);
    }
  };

  /**
   * Ref for the layout container, passed to sidebar for proper container handling
   *
   * Mobile drawers render in a portal so this ensures they stay within the layout container.
   */
  const layoutRef = React.useRef<HTMLDivElement>(null);

  return (
    /* Root container */
    <Box
      ref={layoutRef}
      sx={{
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        height: '100vh',
        width: '100%',
      }}
    >
      <DashboardHeader
        logo={
          <Image
            src="/globe.svg"
            alt="Dashboard logo"
            width={32}
            height={32}
            priority
          />
        }
        title="Dashboard"
        showMenuButton={!isDesktop}
        onMenuClick={handleToggleMobileNav}
        onLogout={handleLogout}
        onResetDemo={handleResetDemo}
      />
      <DashboardSidebar
        open={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main content area */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}
      >
        {/**
         * Toolbar trick to add vertical spacing equal to AppBar height
         * to prevent content being hidden under the header
         */}
        <Toolbar sx={{ displayPrint: 'none' }} />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
