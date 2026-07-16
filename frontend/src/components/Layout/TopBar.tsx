import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MenuIcon from '@mui/icons-material/Menu'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import LogoutIcon from '@mui/icons-material/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../../stores/uiSlice'
import { logout } from '../../stores/authSlice'
import type { RootState } from '../../stores'

export default function TopBar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const theme = useSelector((state: RootState) => state.ui.theme)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const toggleTheme = () => {
    dispatch({ type: 'ui/setTheme', payload: theme === 'light' ? 'dark' : 'light' })
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => dispatch(toggleSidebar())}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {t('app.name')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            color="inherit"
            startIcon={<CloudUploadIcon />}
            onClick={() => navigate('/files')}
          >
            {t('files.upload')}
          </Button>
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <Typography variant="body2" sx={{ mx: 1 }}>
            {user?.username}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
