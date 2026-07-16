import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import filesReducer from './filesSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    files: filesReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['files/setFiles'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
