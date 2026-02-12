import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

/**
 * Styled AppBar overriding MUI default styles
 * - Removes box shadow
 * - Adds bottom border
 * - Ensures z-index is above the drawer
 */
const AppBar = styled(MuiAppBar)(({ theme }) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
}));

/**
 * Container for a logo image
 * - Ensures consistent height
 * - Centers logo vertically
 */
const LogoContainer = styled('div')({
  position: 'relative',
  height: 40,
  display: 'flex',
  alignItems: 'center',
  '& img': {
    maxHeight: 40,
  },
});

export interface DashboardHeaderProps {
  /** Optional logo to display next to the title */
  logo?: React.ReactNode;
  /** Optional title text displayed next to the logo */
  title?: string;
  /** Whether to show the hamburger menu button */
  showMenuButton: boolean;
  /** Callback triggered when the menu button is clicked */
  onMenuClick: () => void;
  /** Callback triggered when the logout button is clicked */
  onLogout: () => void;
}

/**
 * DashboardHeader
 *
 * Renders the top bar of the dashboard layout.
 * - Displays optional logo and title linked to the main dashboard.
 * - Optionally renders a menu button (for opening sidebar navigation).
 * - Displays a logout button that triggers the provided logout callback.
 * - Layout adjusts to support responsive display with flex wrapping.
 */
export default function DashboardHeader({
  logo,
  title,
  showMenuButton,
  onMenuClick,
  onLogout,
}: Readonly<DashboardHeaderProps>) {
  const theme = useTheme();

  return (
    <AppBar
      color="inherit"
      position="absolute"
      sx={{ displayPrint: 'none' }}
      data-testid="dashboard-header"
    >
      <Toolbar sx={{ backgroundColor: 'inherit', mx: { xs: -0.75, sm: -1 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center">
            {showMenuButton && (
              <Box sx={{ mr: 1 }}>
                <Tooltip title="Open navigation menu" enterDelay={1000}>
                  <IconButton
                    size="small"
                    aria-label="Open navigation menu"
                    onClick={onMenuClick}
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}

            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <Stack direction="row" alignItems="center">
                {logo ? <LogoContainer>{logo}</LogoContainer> : null}
                {title ? (
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: '700',
                      ml: 1,
                      whiteSpace: 'nowrap',
                      lineHeight: 1,
                    }}
                  >
                    {title}
                  </Typography>
                ) : null}
              </Stack>
            </Link>
          </Stack>

          <Button
            color="secondary"
            variant="outlined"
            size="small"
            onClick={onLogout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
