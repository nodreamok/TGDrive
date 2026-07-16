import { Outlet } from 'react-router-dom'
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import TopBar from './TopBar'
import SideBar from './SideBar'

export default function Layout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <TopBar />
      {!isMobile && <SideBar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' },
          mt: '64px',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
