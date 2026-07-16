import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import Layout from './components/Layout/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Files from './pages/Files'
import Admin from './pages/Admin'
import ContextMenu from './components/ContextMenu/ContextMenu'
import PreviewDialog from './components/Preview/PreviewDialog'
import ShareDialog from './components/Share/ShareDialog'
import { hideContextMenu, setPreviewDialog, setShareDialog } from './stores/uiSlice'
import type { RootState } from './stores'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: any) => state.auth.user)
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

function App() {
  const loading = useSelector((state: any) => state.auth.loading)
  const contextMenu = useSelector((state: RootState) => state.ui.contextMenu)
  const previewDialog = useSelector((state: RootState) => state.ui.previewDialog)
  const shareDialog = useSelector((state: RootState) => state.ui.shareDialog)
  const dispatch = useDispatch()

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/files" replace />} />
          <Route path="files" element={<Dashboard />} />
          <Route path="files/*" element={<Files />} />
          <Route path="admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ContextMenu
        anchorEl={contextMenu?.x ? { x: contextMenu.x, y: contextMenu.y } as any : null}
        open={contextMenu?.visible || false}
        onClose={() => dispatch(hideContextMenu())}
        file={null}
        onAction={(action) => {
          console.log('Context menu action:', action)
        }}
      />

      <PreviewDialog
        open={previewDialog.visible}
        fileKey={previewDialog.fileKey}
        onClose={() => dispatch(setPreviewDialog({ visible: false, fileKey: null }))}
      />

      <ShareDialog
        open={shareDialog.visible}
        fileKey={shareDialog.fileKey}
        onClose={() => dispatch(setShareDialog({ visible: false, fileKey: null }))}
      />
    </>
  )
}

export default App
