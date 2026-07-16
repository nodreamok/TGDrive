import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderIcon from '@mui/icons-material/Folder'
import StorageIcon from '@mui/icons-material/Storage'
import DownloadIcon from '@mui/icons-material/Download'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setError } from '@/stores/filesSlice'
import api from '@/services/api'

export default function Dashboard() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.auth.user)

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    try {
      await api.get('/files?page=1')
    } catch (err: any) {
      dispatch(setError(err.response?.data?.error || 'Failed to load files'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const usedPercentage = user ? Math.round((user.usedBytes / user.quotaBytes) * 100) : 0

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t('nav.dashboard')}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <DashboardIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">总文件数</Typography>
              </Box>
              <Typography variant="h3" color="primary.main">
                -
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <StorageIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">存储空间</Typography>
              </Box>
              <Typography variant="h3" color="primary.main">
                {usedPercentage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                已用 {Math.round(user?.usedBytes / 1024 / 1024 || 0)} MB / {Math.round(user?.quotaBytes / 1024 / 1024 || 0)} MB
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <DownloadIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">下载次数</Typography>
              </Box>
              <Typography variant="h3" color="primary.main">
                -
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FolderIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">文件夹</Typography>
              </Box>
              <Typography variant="h3" color="primary.main">
                -
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
