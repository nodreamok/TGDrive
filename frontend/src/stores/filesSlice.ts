import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FileInfo, FolderInfo } from '../types'

interface FilesState {
  files: FileInfo[]
  folders: FolderInfo[]
  currentPath: string[]
  selectedKeys: string[]
  loading: boolean
  error: string | null
  viewMode: 'list' | 'grid'
  sortBy: 'name' | 'time' | 'size' | 'downloads'
  sortOrder: 'asc' | 'desc'
}

const initialState: FilesState = {
  files: [],
  folders: [],
  currentPath: [],
  selectedKeys: [],
  loading: false,
  error: null,
  viewMode: 'list',
  sortBy: 'time',
  sortOrder: 'desc',
}

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<FileInfo[]>) => {
      state.files = action.payload
    },
    setFolders: (state, action: PayloadAction<FolderInfo[]>) => {
      state.folders = action.payload
    },
    addFile: (state, action: PayloadAction<FileInfo>) => {
      state.files.push(action.payload)
    },
    updateFile: (state, action: PayloadAction<FileInfo>) => {
      const index = state.files.findIndex(f => f.key === action.payload.key)
      if (index !== -1) {
        state.files[index] = action.payload
      }
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(f => f.key !== action.payload)
    },
    setCurrentPath: (state, action: PayloadAction<string[]>) => {
      state.currentPath = action.payload
    },
    setSelectedKeys: (state, action: PayloadAction<string>) => {
      if (state.selectedKeys.includes(action.payload)) {
        state.selectedKeys = state.selectedKeys.filter(k => k !== action.payload)
      } else {
        state.selectedKeys.push(action.payload)
      }
    },
    selectAll: (state) => {
      state.selectedKeys = [...state.files.map(f => f.key), ...state.folders.map(f => f.key)]
    },
    clearSelection: (state) => {
      state.selectedKeys = []
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setViewMode: (state, action: PayloadAction<'list' | 'grid'>) => {
      state.viewMode = action.payload
    },
    setSortBy: (state, action: PayloadAction<'name' | 'time' | 'size' | 'downloads'>) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload
    },
  },
})

export const {
  setFiles,
  setFolders,
  addFile,
  updateFile,
  removeFile,
  setCurrentPath,
  setSelectedKeys,
  selectAll,
  clearSelection,
  setLoading,
  setError,
  setViewMode,
  setSortBy,
  setSortOrder,
} = filesSlice.actions
export default filesSlice.reducer
