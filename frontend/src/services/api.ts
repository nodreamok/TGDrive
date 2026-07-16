import axios from 'axios'
import type { FileInfo, User, ActivityLog, InviteCode, ApiResponse } from '../types'

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
console.log('[API] API_BASE =', API_BASE, 'VITE_API_URL =', import.meta.env.VITE_API_URL)

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const filesApi = {
  getFiles: (params?: { page?: number; q?: string; sort?: string; order?: string; user_id?: string }) =>
    api.get<ApiResponse<{ files: FileInfo[]; pagination: any }>>('/files', { params }).then(r => r.data),

  getDeletedFiles: (params?: { page?: number }) =>
    api.get<ApiResponse<{ files: FileInfo[] }>>('/files', { params: { ...params, deleted: 1 } }).then(r => r.data),

  deleteFiles: (keys: string[]) =>
    api.post<ApiResponse<{ deleted: number }>>('/files/delete', { keys }).then(r => r.data),

  restoreFiles: (keys: string[]) =>
    api.post<ApiResponse<{ restored: number }>>('/files/restore', { keys }).then(r => r.data),

  rename: (key: string, newName: string) =>
    api.post<ApiResponse<{ oldName: string; newName: string }>>('/rename', { key, newName }).then(r => r.data),

  move: (keys: string[], target: string | null) =>
    api.post<ApiResponse<{ moved: number }>>('/move', { keys, target }).then(r => r.data),

  share: (payload: { key: string; is_public: boolean; shared_with: number[]; shared_expires?: number }) =>
    api.post<ApiResponse<{ is_public: boolean; shared_with: number[] }>>('/share', payload).then(r => r.data),

  setNote: (key: string, note: string) =>
    api.post<ApiResponse<{}>>('/note', { key, note }).then(r => r.data),
}

export const uploadApi = {
  getChunkUrl: (key: string, index: number) =>
    api.get(`/chunk-url/${key}/${index}`).then(r => r.data),

  commit: (data: {
    fileName: string
    size: number
    mimeType: string
    chunks: string[]
    expires?: number
    maxDl?: number
    parent?: string
    note?: string
  }) =>
    api.post<ApiResponse<{ key: string }>>('/upload/commit', data).then(r => r.data),
}

export const usersApi = {
  getUsers: (params?: { page?: number; q?: string }) =>
    api.get<ApiResponse<{ users: User[]; pagination: any }>>('/users', { params }).then(r => r.data),

  createUser: (data: { username: string; password: string; role?: string; quotaBytes?: number }) =>
    api.post<ApiResponse<{}>>('/users', data).then(r => r.data),

  updateUser: (id: number, data: { username?: string; password?: string; role?: string; quotaBytes?: number; isActive?: boolean }) =>
    api.put(`/users/${id}`, data).then(r => r.data),

  deleteUser: (id: number) =>
    api.delete(`/users/${id}`).then(r => r.data),
}

export const adminApi = {
  getStats: () =>
    api.get<ApiResponse<any>>('/admin/api/stats').then(r => r.data),

  getFiles: (params?: { page?: number; q?: string; sort?: string; order?: string; user_id?: string }) =>
    api.get<ApiResponse<{ files: any[]; pagination: any }>>('/admin/api/files', { params }).then(r => r.data),

  getUsers: (params?: { page?: number }) =>
    api.get<ApiResponse<{ users: any[]; pagination: any }>>('/admin/api/users', { params }).then(r => r.data),

  getLogs: (params?: { page?: number; action?: string; user_id?: string }) =>
    api.get<ApiResponse<{ logs: ActivityLog[]; pagination: any }>>('/admin/api/logs', { params }).then(r => r.data),

  getSettings: () =>
    api.get<ApiResponse<Record<string, any>>>('/admin/api/settings').then(r => r.data),

  updateSetting: (key: string, value: any) =>
    api.put(`/admin/api/settings/${encodeURIComponent(key)}`, { value }).then(r => r.data),

  getInvites: () =>
    api.get<ApiResponse<InviteCode[]>>('/admin/api/invites').then(r => r.data),

  createInvite: (data?: { code?: string; maxUses?: number; expires?: number; note?: string }) =>
    api.post<ApiResponse<{ code: string }>>('/admin/api/invites', data).then(r => r.data),

  deleteInvite: (code: string) =>
    api.delete(`/admin/api/invites/${encodeURIComponent(code)}`).then(r => r.data),
}

export default api
