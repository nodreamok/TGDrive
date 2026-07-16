import { useState } from 'react'
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
import { setError } from '@/stores/authSlice'
import api from '@/services/api'

export default function Register() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
  const error = useSelector((state: any) => state.auth.error)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/files" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setError(null))

    if (password !== password2) {
      dispatch(setError('两次输入的密码不一致'))
      return
    }

    try {
      const response = await api.post('/register', {
        username,
        password,
        inviteCode: inviteCode || undefined,
      })
      if (response.data.token) {
        navigate('/login', { replace: true })
      }
    } catch (err: any) {
      dispatch(setError(err.response?.data?.error || t('auth.registerFailed')))
    }
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
            创建新账户
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
            <TextField
              fullWidth
              label={t('auth.confirmPassword')}
              type={showPassword ? 'text' : 'password'}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label={t('auth.inviteCode')}
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              margin="normal"
              placeholder="可选"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              {t('auth.register')}
            </Button>
          </form>

          <Typography align="center" variant="body2">
            <Button
              color="primary"
              onClick={() => navigate('/login')}
            >
              {t('auth.login')}
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
