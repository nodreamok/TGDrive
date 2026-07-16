import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { login, setError } from '@/stores/authSlice'
import api from '@/services/api'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
  const error = useSelector((state: any) => state.auth.error)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/files', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setError(null))

    try {
      const response = await api.post('/login', { username, password })
      const token = response.data.token
      localStorage.setItem('token', token)
      
      const userResponse = await api.get('/users/me')
      dispatch(login({ token, user: userResponse.data.user || { username } }))
      navigate('/files', { replace: true })
    } catch (err: any) {
      dispatch(setError(err.response?.data?.error || t('auth.loginFailed')))
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/files" replace />
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {t('app.name')}
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            自托管文件管理系统
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t('auth.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              autoFocus
            />
            <TextField
              fullWidth
              label={t('auth.password')}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('auth.login')}
            </Button>
          </form>

          <Typography align="center" variant="body2">
            <Button
              color="primary"
              onClick={() => navigate('/register')}
            >
              {t('auth.register')}
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
