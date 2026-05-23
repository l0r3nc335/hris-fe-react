import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface UiState {
  sidebarOpen: boolean
  theme: ThemeMode
  globalLoading: boolean
}

const initialState: UiState = {
  sidebarOpen: true,
  theme: 'system',
  globalLoading: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload
    },
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload
    },
  },
})

export const { toggleSidebar, setSidebarOpen, setTheme, setGlobalLoading } = uiSlice.actions
export const uiReducer = uiSlice.reducer
