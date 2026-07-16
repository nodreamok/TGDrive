import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Checkbox,
  Typography,
  CircularProgress,
  Alert,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Chip,
} from '@mui/material'
import {
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  VideoFile as VideoIcon,
  AudioFile as AudioIcon,
  PictureAsPdf as PdfIcon,
  Description as TextIcon,
  MoreVert as MoreIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  Info as InfoIcon,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setFiles, setLoading, setError, setSelectedKeys, clearSelection, selectAll } from '@/stores/filesSlice'
import { showContextMenu } from '@/stores/uiSlice'
import api from '@/services/api'
import type { FileInfo } from '@/types'

function getFileIcon(file: FileInfo) {
  if (file.mimeType.startsWith('image/')) return <ImageIcon color="primary" />
  if (file.mimeType.startsWith('video/')) return <VideoIcon color="secondary" />
  if (file.mimeType.startsWith('audio/')) return <AudioIcon color="action" />
  if (file.mimeType === 'application/pdf') return <PdfIcon color="error" />
  if (file.mimeType.startsWith('text/') || file.fileName.match(/\.(txt|md|json|js|ts|py|java|c|cpp|h|css|html|xml|yaml|yml|sh|bat|sql)$/i)) {
    return <TextIcon color="info" />
  }
  return <FileIcon color="disabled" />
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString('zh-CN')
}

interface FileListProps {
  onFileClick?: (file: FileInfo) => void
}

export default function FileList({ onFileClick }: FileListProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { files, selectedKeys, loading, error, sortBy, sortOrder } = useSelector((state: any) => state.files)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [anchorEl, setAnchorEl] = useState<{ el: HTMLElement; file: FileInfo } | null>(null)

  useEffect(() => {
    loadFiles()
  }, [sortBy, sortOrder])

  const loadFiles = async () => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    try {
      const params: any = { page: page + 1, limit: rowsPerPage, sort: sortBy, order: sortOrder }
      const data = await api.get('/files', { params }).then(r => r.data)
      dispatch(setFiles(data.files || []))
    } catch (err: any) {
      dispatch(setError(err.response?.data?.error || 'Failed to load files'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleContextMenu = (event: React.MouseEvent, file: FileInfo) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl({ el: event.currentTarget as HTMLElement, file })
    dispatch(showContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      targetKey: file.key,
      targetType: 'file',
    }))
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    dispatch(showContextMenu({ visible: false, x: 0, y: 0, targetKey: null, targetType: 'none' }))
  }

  const handleRowClick = (file: FileInfo) => {
    dispatch(setSelectedKeys(file.key))
    if (onFileClick) {
      onFileClick(file)
    }
  }

  const handleSelectAll = () => {
    dispatch(selectAll())
  }

  const handleClearSelection = () => {
    dispatch(clearSelection())
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  if (files.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography color="text.secondary">
          {t('files.empty')}
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          共 {files.length} 个项目
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {selectedKeys.length > 0 && (
            <>
              <Typography variant="body2" sx={{ mr: 2 }}>
                已选择 {selectedKeys.length} 项
              </Typography>
              <Tooltip title="下载">
                <IconButton size="small">
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="分享">
                <IconButton size="small">
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="删除">
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>

      <TableContainer sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedKeys.length > 0 && selectedKeys.length < files.length}
                  checked={files.length > 0 && selectedKeys.length === files.length}
                  onChange={selectedKeys.length > 0 ? handleClearSelection : handleSelectAll}
                />
              </TableCell>
              <TableCell>{t('app.name')}</TableCell>
              <TableCell>{t('app.size')}</TableCell>
              <TableCell>{t('app.time')}</TableCell>
              <TableCell>{t('app.downloads')}</TableCell>
              <TableCell padding="checkbox"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file: FileInfo) => (
              <TableRow
                key={file.key}
                hover
                selected={selectedKeys.includes(file.key)}
                onClick={() => handleRowClick(file)}
                onContextMenu={(e) => handleContextMenu(e, file)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedKeys.includes(file.key)}
                    onClick={(e) => {
                      e.stopPropagation()
                      dispatch(setSelectedKeys(file.key))
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getFileIcon(file)}
                    <Typography noWrap>{file.fileName}</Typography>
                    {file.note && (
                      <Chip label={file.note} size="small" variant="outlined" sx={{ height: 20 }} />
                    )}
                  </Box>
                </TableCell>
                <TableCell>{formatSize(file.size)}</TableCell>
                <TableCell>{formatDate(file.timestamp)}</TableCell>
                <TableCell>{file.downloads}</TableCell>
                <TableCell padding="checkbox">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleContextMenu(e, file)
                    }}
                  >
                    <MoreIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={files.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
        labelRowsPerPage="每页行数:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} 共 ${count}`}
      />

      <Menu
        anchorEl={anchorEl?.el}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('context.download')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon><ShareIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('context.share')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('context.rename')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon><CopyIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('context.copy')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon><InfoIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t('context.properties')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>{t('context.delete')}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}
