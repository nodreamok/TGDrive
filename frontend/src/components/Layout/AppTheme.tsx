import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from '@/theme'

export default function AppTheme({ children }: { children: React.ReactNode }) {
  const themeMode = useSelector((state: any) => state.ui.theme)

  const theme = useMemo(() => {
    const base = themeMode === 'dark' ? darkTheme : lightTheme
    return createTheme(base)
  }, [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
