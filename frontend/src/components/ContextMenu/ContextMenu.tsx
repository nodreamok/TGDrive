import { useTranslation } from 'react-i18next'
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import {
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  DriveFileMove as MoveIcon,
  Info as InfoIcon,
  Link as LinkIcon,
  ContentCut as CutIcon,
} from '@mui/icons-material'
import type { FileInfo } from '@/types'

interface ContextMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: () => void
  file: FileInfo | null
  onAction: (action: string, file: FileInfo) => void
}

export default function ContextMenu({ anchorEl, open, onClose, file, onAction }: ContextMenuProps) {
  const { t } = useTranslation()

  if (!file) return null

  const handleAction = (action: string) => {
    onAction(action, file)
    onClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={onClose}
      slotProps={{
        paper: {
          sx: { minWidth: 200 }
        }
      }}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => handleAction('open')}>
        <ListItemIcon><FolderIcon fontSize="small" /></ListItemIcon>
        <ListItemText>{t('context.open')}</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleAction('download')}>
        <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
        <ListItemText>{t('context.download')}</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleAction('preview')}>
        <ListItemIcon><FileIcon fontSize="small" /></ListItemIcon>
        <ListItemText>{t('context.preview')}</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleAction('share')}>
        <ListItemIcon><ShareIcon fontSize="small" /></ListItemIcon>
        <ListItemText>{t('context.share')}</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem onClick={() => handleAction('rename')}>
        <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
        <ListItemText>{t('context.rename')}</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleAction('move')}>
        <ListItemIcon><MoveIcon fontSize="small" /></ListItemIcon>
        <ListItemText>{t('context.move')}</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleAction('copy')}>
        <ListItemIcon><CopyIcon fontSize="small" /></ListItemIcon>
        <ListItemText>{t('context.copy')}</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleAction('cut')}>
        <ListItemIcon><CutIcon fontSize="small" /></ListItemIcon>
        <ListItemText>{t('context.cut')}</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem onClick={() => handleAction('copyLink')}>
        <ListItemIcon><LinkIcon fontSize="small" /></ListItemIcon>
        <ListItemText>{t('context.copyLink')}</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleAction('properties')}>
        <ListItemIcon><InfoIcon fontSize="small" /></ListItemIcon>
        <ListItemText>{t('context.properties')}</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem onClick={() => handleAction('delete')} sx={{ color: 'error.main' }}>
        <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
        <ListItemText>{t('context.delete')}</ListItemText>
      </MenuItem>
    </Menu>
  )
}
