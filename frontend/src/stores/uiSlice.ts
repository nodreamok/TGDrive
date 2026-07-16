import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  language: 'zh' | 'en'
  contextMenu: {
    visible: boolean
    x: number
    y: number
    targetKey: string | null
    targetType: 'file' | 'folder' | 'none'
  } | null
  uploadDialog: boolean
  shareDialog: {
    visible: boolean
    fileKey: string | null
  }
  previewDialog: {
    visible: boolean
    fileKey: string | null
  }
  propertiesDialog: {
    visible: boolean
    fileKey: string | null
  }
}

const initialState: UiState = {
  sidebarOpen: true,
  theme: 'light',
  language: 'zh',
  contextMenu: null,
  uploadDialog: false,
  shareDialog: { visible: false, fileKey: null },
  previewDialog: { visible: false, fileKey: null },
  propertiesDialog: { visible: false, fileKey: null },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    setLanguage: (state, action: PayloadAction<'zh' | 'en'>) => {
      state.language = action.payload
      localStorage.setItem('language', action.payload)
    },
    showContextMenu: (state, action: PayloadAction<{
      visible: boolean
      x: number
      y: number
      targetKey: string | null
      targetType: 'file' | 'folder' | 'none'
    }>) => {
      state.contextMenu = action.payload
    },
    hideContextMenu: (state) => {
      state.contextMenu = null
    },
    setUploadDialog: (state, action: PayloadAction<boolean>) => {
      state.uploadDialog = action.payload
    },
    setShareDialog: (state, action: PayloadAction<{ visible: boolean; fileKey: string | null }>) => {
      state.shareDialog = action.payload
    },
    setPreviewDialog: (state, action: PayloadAction<{ visible: boolean; fileKey: string | null }>) => {
      state.previewDialog = action.payload
    },
    setPropertiesDialog: (state, action: PayloadAction<{ visible: boolean; fileKey: string | null }>) => {
      state.propertiesDialog = action.payload
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setLanguage,
  showContextMenu,
  hideContextMenu,
  setUploadDialog,
  setShareDialog,
  setPreviewDialog,
  setPropertiesDialog,
} = uiSlice.actions
export default uiSlice.reducer
