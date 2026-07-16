import { Navigate } from 'react-router-dom'
import { Box, Typography, Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export default function Admin() {
  const { t } = useTranslation()
  const user = useSelector((state: any) => state.auth.user)

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('nav.admin')}
      </Typography>
      <Alert severity="info">
        管理后台功能开发中...
      </Alert>
    </Box>
  )
}
