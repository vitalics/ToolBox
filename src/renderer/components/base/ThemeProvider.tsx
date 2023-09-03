/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { setThemeSelector } from '@/renderer/store/slices/appScreenSlice';

const ThemeProvider = ({ children }) => {
  const theme = useSelector(setThemeSelector);
  const muiTheme = useMemo(
    () =>
      createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        },
        palette: {
          mode: theme,
          background: {
            default: theme === 'dark' ? '#111111' : '#ffffff',
          },
        },
      }),
    [theme],
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <EmotionThemeProvider theme={muiTheme}>{children}</EmotionThemeProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
