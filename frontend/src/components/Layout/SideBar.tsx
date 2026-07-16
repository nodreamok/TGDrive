import { useState, useEffect } from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Box, IconButton } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DashboardIcon from '@mui/icons-material/Dashboard'
import api from '../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import { setSidebarOpen } from '../../stores/uiSlice'

interface FileNode {
  key: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
}

export default function SideBar() {
  const [fileTree, setFileTree] = useState<FileNode[]>([])
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const sidebarOpen = useSelector((state: any) => state.ui.sidebarOpen)

  useEffect(() => {
    loadFileTree()
  }, [])

  const loadFileTree = async () => {
    try {
      const data = await api.get('/folders').then(r => r.data)
      setFileTree(data.folders || [])
    } catch (error) {
      console.error('Failed to load file tree:', error)
    }
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    if (window.innerWidth < 600) {
      dispatch(setSidebarOpen(false))
    }
  }

  const drawerContent = (
    <Box sx={{ overflow: 'auto', p: 2 }}>
      <List component="nav">
        <ListItemButton onClick={() => handleNavigate('/files')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="全部文件" />
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigate('/files?deleted=1')}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="回收站" />
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigate('/files?upload=true')}>
          <ListItemIcon>
            <CloudUploadIcon />
          </ListItemIcon>
          <ListItemText primary="上传" />
        </ListItemButton>
      </List>

      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, px: 2, color: 'text.secondary' }}>
        文件夹
      </Typography>
      <List component="nav">
        {fileTree.map((folder) => (
          <ListItemButton
            key={folder.key}
            selected={location.search.includes(`dir=${folder.key}`)}
            onClick={() => handleNavigate(`/files?dir=${folder.key}`)}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={folder.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <IconButton
        sx={{ display: { sm: 'none' }, position: 'fixed', top: 8, left: 8, zIndex: 1300 }}
        onClick={() => dispatch(setSidebarOpen(true))}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => dispatch(setSidebarOpen(false))}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            top: 64,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            top: 64,
            height: 'calc(100% - 64px)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}
