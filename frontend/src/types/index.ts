export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
  quotaBytes: number;
  usedBytes: number;
  isActive: boolean;
  createdAt: number;
}

export interface FileInfo {
  key: string;
  fileName: string;
  size: number;
  mimeType: string;
  timestamp: number;
  downloads: number;
  expires: number | null;
  maxDl: number | null;
  parent: string | null;
  note: string;
  is_public: boolean;
  shared_with: ShareInfo[];
  deleted: boolean;
  deleted_at: number | null;
  chunks?: string[];
  fileId?: string;
}

export interface ShareInfo {
  user_id: number;
  expires_at: number | null;
}

export interface FolderInfo {
  key: string;
  name: string;
  parent: string | null;
  timestamp: number;
}

export interface ActivityLog {
  id: number;
  user_id: number | null;
  action: string;
  resource: string;
  ip_address: string;
  metadata: string | null;
  created_at: number;
}

export interface Pagination {
  page: number;
  total: number;
  totalPages: number;
  limit: number;
}

export interface ApiResponse<T> {
  data?: T;
  files?: FileInfo[];
  users?: User[];
  logs?: ActivityLog[];
  invites?: InviteCode[];
  settings?: Record<string, any>;
  ok?: boolean;
  error?: string;
  pagination?: Pagination;
}

export interface InviteCode {
  code: string;
  created_by: number;
  max_uses: number;
  use_count: number;
  expires_at: number | null;
  note: string | null;
  created_at: number;
}

export interface CreateSharePayload {
  key: string;
  is_public: boolean;
  shared_with: number[];
  shared_expires?: number;
}
