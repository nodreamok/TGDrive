import { createTheme, type ThemeOptions } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0969da',
      light: '#218bff',
      dark: '#0550ae',
    },
    secondary: {
      main: '#8b949e',
    },
    background: {
      default: '#f6f8fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2328',
      secondary: '#656d76',
    },
    error: {
      main: '#cf222e',
    },
    success: {
      main: '#1a7f37',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    fontSize: 14,
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.08)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #d0d7de',
        },
      },
    },
  },
} as ThemeOptions);

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#58a6ff',
      light: '#79c0ff',
      dark: '#1f6feb',
    },
    secondary: {
      main: '#8b949e',
    },
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    text: {
      primary: '#c9d1d9',
      secondary: '#8b949e',
    },
    error: {
      main: '#f85149',
    },
    success: {
      main: '#3fb950',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    fontSize: 14,
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.3)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #30363d',
        },
      },
    },
  },
} as ThemeOptions);
