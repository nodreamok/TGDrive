import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      'app.name': 'TGDrive',
      'app.loading': 'Loading...',
      'app.error': 'Error',
      'app.success': 'Success',
      'app.cancel': 'Cancel',
      'app.confirm': 'Confirm',
      'app.save': 'Save',
      'app.delete': 'Delete',
      'app.edit': 'Edit',
      'app.create': 'Create',
      'app.search': 'Search',
      'app.filter': 'Filter',
      'app.actions': 'Actions',
      'app.status': 'Status',
      'common.name': 'Name',
      'app.size': 'Size',
      'app.time': 'Time',
      'app.type': 'Type',
      'app.owner': 'Owner',
      'app.downloads': 'Downloads',

      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.files': 'Files',
      'nav.users': 'Users',
      'nav.settings': 'Settings',
      'nav.admin': 'Admin',
      'nav.logout': 'Logout',

      // Auth
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.username': 'Username',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.inviteCode': 'Invite Code',
      'auth.loginSuccess': 'Login successful',
      'auth.loginFailed': 'Invalid username or password',
      'auth.registerSuccess': 'Registration successful',
      'auth.registerFailed': 'Registration failed',
      'auth.logoutSuccess': 'Logged out successfully',

      // Files
      'files.upload': 'Upload',
      'files.download': 'Download',
      'files.preview': 'Preview',
      'files.share': 'Share',
      'files.rename': 'Rename',
      'files.move': 'Move',
      'files.delete': 'Delete',
      'files.restore': 'Restore',
      'files.permanentDelete': 'Permanent Delete',
      'files.copy': 'Copy',
      'files.paste': 'Paste',
      'files.newFolder': 'New Folder',
      'files.selectAll': 'Select All',
      'files.batchDelete': 'Batch Delete',
      'files.batchMove': 'Batch Move',
      'files.batchDownload': 'Batch Download',
      'files.empty': 'No files',
      'files.emptyFolder': 'This folder is empty',
      'files.noResults': 'No results found',

      // Context Menu
      'context.open': 'Open',
      'context.download': 'Download',
      'context.preview': 'Preview',
      'context.share': 'Share',
      'context.rename': 'Rename',
      'context.move': 'Move',
      'context.copy': 'Copy',
      'context.cut': 'Cut',
      'context.paste': 'Paste',
      'context.delete': 'Delete',
      'context.properties': 'Properties',
      'context.copyLink': 'Copy Link',

      // Share
      'share.create': 'Create Share Link',
      'share.public': 'Public',
      'share.password': 'Password',
      'share.expires': 'Expires',
      'share.downloadLimit': 'Download Limit',
      'share.neverExpires': 'Never expires',
      'share.linkCopied': 'Link copied to clipboard',

      // Upload
      'upload.selectFiles': 'Select Files',
      'upload.selectFolder': 'Select Folder',
      'upload.uploading': 'Uploading',
      'upload.uploadComplete': 'Upload complete',
      'upload.uploadFailed': 'Upload failed',
      'upload.paused': 'Paused',
      'upload.resume': 'Resume',
      'upload.cancel': 'Cancel',
      'upload.retry': 'Retry',

      // Preview
      'preview.cannotPreview': 'Cannot preview this file type',

      // Admin
      'admin.dashboard': 'Dashboard',
      'admin.files': 'File Management',
      'admin.users': 'User Management',
      'admin.invites': 'Invite Codes',
      'admin.logs': 'Activity Logs',
      'admin.settings': 'System Settings',
      'admin.totalUsers': 'Total Users',
      'admin.totalFiles': 'Total Files',
      'admin.totalSize': 'Total Size',
      'admin.quotaUsage': 'Quota Usage',
      'admin.recentActivity': 'Recent Activity',

      // Errors
      'error.unauthorized': 'Unauthorized',
      'error.forbidden': 'Forbidden',
      'error.notFound': 'Not Found',
      'error.serverError': 'Server Error',
      'error.networkError': 'Network Error',
      'error.sessionExpired': 'Session expired, please login again',
    },
  },
  zh: {
    translation: {
      // Common
      'app.name': 'TGDrive',
      'app.loading': '加载中...',
      'app.error': '错误',
      'app.success': '成功',
      'app.cancel': '取消',
      'app.confirm': '确认',
      'app.save': '保存',
      'app.delete': '删除',
      'app.edit': '编辑',
      'app.create': '创建',
      'app.search': '搜索',
      'app.filter': '筛选',
      'app.actions': '操作',
      'app.status': '状态',
      'common.name': '名称',
      'app.size': '大小',
      'app.time': '时间',
      'app.type': '类型',
      'app.owner': '所有者',
      'app.downloads': '下载次数',

      // Navigation
      'nav.dashboard': '仪表盘',
      'nav.files': '文件管理',
      'nav.users': '用户管理',
      'nav.settings': '系统设置',
      'nav.admin': '管理后台',
      'nav.logout': '退出登录',

      // Auth
      'auth.login': '登录',
      'auth.register': '注册',
      'auth.username': '用户名',
      'auth.password': '密码',
      'auth.confirmPassword': '确认密码',
      'auth.inviteCode': '邀请码',
      'auth.loginSuccess': '登录成功',
      'auth.loginFailed': '用户名或密码错误',
      'auth.registerSuccess': '注册成功',
      'auth.registerFailed': '注册失败',
      'auth.logoutSuccess': '已退出登录',

      // Files
      'files.upload': '上传',
      'files.download': '下载',
      'files.preview': '预览',
      'files.share': '分享',
      'files.rename': '重命名',
      'files.move': '移动',
      'files.delete': '删除',
      'files.restore': '恢复',
      'files.permanentDelete': '永久删除',
      'files.copy': '复制',
      'files.paste': '粘贴',
      'files.newFolder': '新建文件夹',
      'files.selectAll': '全选',
      'files.batchDelete': '批量删除',
      'files.batchMove': '批量移动',
      'files.batchDownload': '批量下载',
      'files.empty': '暂无文件',
      'files.emptyFolder': '此文件夹为空',
      'files.noResults': '未找到结果',

      // Context Menu
      'context.open': '打开',
      'context.download': '下载',
      'context.preview': '预览',
      'context.share': '分享',
      'context.rename': '重命名',
      'context.move': '移动',
      'context.copy': '复制',
      'context.cut': '剪切',
      'context.paste': '粘贴',
      'context.delete': '删除',
      'context.properties': '属性',
      'context.copyLink': '复制链接',

      // Share
      'share.create': '创建分享链接',
      'share.public': '公开',
      'share.password': '密码',
      'share.expires': '过期时间',
      'share.downloadLimit': '下载限制',
      'share.neverExpires': '永不过期',
      'share.linkCopied': '链接已复制到剪贴板',

      // Upload
      'upload.selectFiles': '选择文件',
      'upload.selectFolder': '选择文件夹',
      'upload.uploading': '上传中',
      'upload.uploadComplete': '上传完成',
      'upload.uploadFailed': '上传失败',
      'upload.paused': '已暂停',
      'upload.resume': '继续',
      'upload.cancel': '取消',
      'upload.retry': '重试',

      // Preview
      'preview.cannotPreview': '无法预览此文件类型',

      // Admin
      'admin.dashboard': '仪表盘',
      'admin.files': '文件管理',
      'admin.users': '用户管理',
      'admin.invites': '邀请码',
      'admin.logs': '操作日志',
      'admin.settings': '系统设置',
      'admin.totalUsers': '总用户数',
      'admin.totalFiles': '文件总数',
      'admin.totalSize': '总大小',
      'admin.quotaUsage': '配额使用',
      'admin.recentActivity': '最近活动',

      // Errors
      'error.unauthorized': '未授权',
      'error.forbidden': '禁止访问',
      'error.notFound': '未找到',
      'error.serverError': '服务器错误',
      'error.networkError': '网络错误',
      'error.sessionExpired': '会话已过期，请重新登录',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
