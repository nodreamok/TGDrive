import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: any | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    login: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload.token)
    },
  },
})

export const { setLoading, setError, setUser, setToken, logout, login } = authSlice.actions
export default authSlice.reducer
