import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import { Close as CloseIcon, AudioFile as AudioIcon, Description as TextIcon } from '@mui/icons-material'
import api from '@/services/api'

interface PreviewDialogProps {
  open: boolean
  fileKey: string | null
  onClose: () => void
}

export default function PreviewDialog({ open, fileKey, onClose }: PreviewDialogProps) {
  const { t } = useTranslation()
  const [fileInfo, setFileInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && fileKey) {
      loadFileInfo()
    }
  }, [open, fileKey])

  const loadFileInfo = async () => {
    setLoading(true)
    try {
      const data = await api.get(`/files/${fileKey}`).then(r => r.data)
      setFileInfo(data.file)
    } catch (err) {
      console.error('Failed to load file info:', err)
    } finally {
      setLoading(false)
    }
  }

  const getPreviewComponent = () => {
    if (!fileInfo) return null
    
    const mimeType = fileInfo.mimeType || ''
    
    if (mimeType.startsWith('image/')) {
      return (
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={fileInfo.url || `/api/proxy/${fileKey}`}
            alt={fileInfo.fileName}
            style={{ maxWidth: '100%', maxHeight: '70vh' }}
          />
        </Box>
      )
    }
    
    if (mimeType.startsWith('video/')) {
      return (
        <Box sx={{ textAlign: 'center' }}>
          <video controls style={{ maxWidth: '100%', maxHeight: '70vh' }}>
            <source src={fileInfo.url || `/api/proxy/${fileKey}`} type={mimeType} />
            您的浏览器不支持视频播放
          </video>
        </Box>
      )
    }
    
    if (mimeType.startsWith('audio/')) {
      return (
        <Box sx={{ textAlign: 'center', pt: 4 }}>
          <AudioIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <audio controls style={{ width: '100%' }}>
            <source src={fileInfo.url || `/api/proxy/${fileKey}`} type={mimeType} />
            您的浏览器不支持音频播放
          </audio>
        </Box>
      )
    }
    
    if (mimeType === 'application/pdf') {
      return (
        <Box sx={{ height: '70vh' }}>
          <iframe
            src={fileInfo.url || `/api/proxy/${fileKey}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title={fileInfo.fileName}
          />
        </Box>
      )
    }
    
    if (mimeType.startsWith('text/') || fileInfo.fileName?.match(/\.(txt|md|json|js|ts|py|java|c|cpp|h|css|html|xml|yaml|yml|sh|bat|sql)$/i)) {
      return (
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, maxHeight: '70vh', overflow: 'auto' }}>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {fileInfo.content || '加载中...'}
          </pre>
        </Box>
      )
    }
    
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <TextIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography color="text.secondary">
          {t('preview.cannotPreview')}
        </Typography>
      </Box>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" noWrap>
            {fileInfo?.fileName || '预览'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Typography>加载中...</Typography>
          </Box>
        ) : (
          getPreviewComponent()
        )}
      </DialogContent>
    </Dialog>
  )
}
