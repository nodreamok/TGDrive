import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Button, Alert } from '@mui/material'
import { CloudUpload, Refresh } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setFiles, setLoading, setError } from '@/stores/filesSlice'
import api from '@/services/api'
import FileList from '@/components/FileList/FileList'

export default function Files() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const error = useSelector((state: any) => state.files.error)

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    try {
      const response = await api.get('/files?page=1&limit=50')
      dispatch(setFiles(response.data.files || []))
    } catch (err: any) {
      dispatch(setError(err.response?.data?.error || 'Failed to load files'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          {t('nav.files')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadFiles}
          >
            刷新
          </Button>
          <Button
            variant="contained"
            startIcon={<CloudUpload />}
          >
            {t('files.upload')}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FileList />
    </Box>
  )
}
