import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, FormControlLabel, IconButton } from '@mui/material'
import { Close as CloseIcon, ContentCopy as CopyIcon } from '@mui/icons-material'
import api from '@/services/api'

interface ShareDialogProps {
  open: boolean
  fileKey: string | null
  onClose: () => void
}

export default function ShareDialog({ open, fileKey, onClose }: ShareDialogProps) {
  const { t } = useTranslation()
  const [isPublic, setIsPublic] = useState(false)
  const [password, setPassword] = useState('')
  const [expires, setExpires] = useState('')
  const [shareLink, setShareLink] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && fileKey) {
      loadShareInfo()
    }
  }, [open, fileKey])

  const loadShareInfo = async () => {
    try {
      const data = await api.get(`/share/${fileKey}`).then(r => r.data)
      setIsPublic(data.is_public || false)
      setPassword(data.password || '')
      setShareLink(data.share_link || '')
    } catch (err) {
      console.error('Failed to load share info:', err)
    }
  }

  const handleCreateShare = async () => {
    setLoading(true)
    try {
      const response = await api.post('/share', {
        key: fileKey,
        is_public: isPublic,
        password: password || undefined,
        expires: expires ? new Date(expires).getTime() / 1000 : undefined,
      })
      setShareLink(response.data.share_link || '')
    } catch (err) {
      console.error('Failed to create share:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {t('share.create')}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            }
            label="公开分享"
          />

          {isPublic && (
            <>
              <TextField
                label="密码（可选）"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              
              <TextField
                label="过期时间"
                type="datetime-local"
                value={expires}
                onChange={(e) => setExpires(e.target.value)}
                fullWidth
              />
            </>
          )}

          {shareLink && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                分享链接
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  value={shareLink}
                  fullWidth
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                <IconButton onClick={handleCopyLink}>
                  <CopyIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t('app.cancel')}</Button>
        <Button onClick={handleCreateShare} variant="contained" disabled={loading}>
          {t('share.create')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
