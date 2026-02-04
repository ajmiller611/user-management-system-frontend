import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/*reads user's preferred color scheme(light/dark) */}
        <InitColorSchemeScript attribute="class" />

        {/*enables CSS optimizations and cache behavior to support server rendering + client hydration*/}
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {/*provides Material UI theme*/}
          <ThemeProvider theme={theme}>
            {/*adds Material UI baseline CSS(standardized base styles)*/}
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
