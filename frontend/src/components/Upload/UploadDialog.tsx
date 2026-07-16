import { useTranslation } from 'react-i18next'
import { useState, useCallback } from 'react'
import { Box, Typography, Button, LinearProgress, IconButton, Paper, List, ListItem, ListItemText } from '@mui/material'
import { CloudUpload, FolderOpen, Pause, Delete, CheckCircle, Error as ErrorIcon } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { setUploadDialog } from '@/stores/uiSlice'
import api from '@/services/api'

interface UploadTask {
  id: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'paused' | 'completed' | 'error'
  error?: string
}

export default function UploadDialog() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [tasks, setTasks] = useState<UploadTask[]>([])
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return
    const newTasks: UploadTask[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).slice(2),
      file,
      progress: 0,
      status: 'pending',
    }))
    setTasks(prev => [...prev, ...newTasks])
    newTasks.forEach(task => uploadFile(task))
  }, [])

  const uploadFile = async (task: UploadTask) => {
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'uploading' } : t))
    
    try {
      const formData = new FormData()
      formData.append('file', task.file)
      
      await api.post('/upload', formData, {
        onUploadProgress: (progressEvent: any) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setTasks(prev => prev.map(t => t.id === task.id ? { ...t, progress } : t))
        },
      })
      
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'completed', progress: 100 } : t))
    } catch (err: any) {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'error', error: err.message } : t))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleClose = () => {
    dispatch(setUploadDialog(false))
    setTasks([])
  }

  return (
    <Paper sx={{ p: 3, minWidth: 500, maxWidth: 600 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          {t('upload.selectFiles')}
        </Typography>
        <IconButton onClick={handleClose}>
          <Delete />
        </IconButton>
      </Box>

      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: dragOver ? 'primary.main' : 'divider',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: dragOver ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s',
        }}
      >
        <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="body1" gutterBottom>
          拖拽文件到此处上传
        </Typography>
        <Typography variant="body2" color="text.secondary">
          或点击选择文件
        </Typography>
        <Button
          variant="outlined"
          component="label"
          startIcon={<FolderOpen />}
          sx={{ mt: 2 }}
        >
          选择文件
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />
        </Button>
      </Box>

      {tasks.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            上传队列 ({tasks.length})
          </Typography>
          <List>
            {tasks.map(task => (
              <ListItem key={task.id}>
                <ListItemText
                  primary={task.file.name}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <LinearProgress variant="determinate" value={task.progress} />
                      <Typography variant="caption" color="text.secondary">
                        {task.status === 'completed' ? '上传完成' : 
                         task.status === 'error' ? task.error :
                         `${task.progress}%`}
                      </Typography>
                    </Box>
                  }
                />
                {task.status === 'uploading' && <Pause />}
                {task.status === 'completed' && <CheckCircle color="success" />}
                {task.status === 'error' && <ErrorIcon color="error" />}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  )
}
