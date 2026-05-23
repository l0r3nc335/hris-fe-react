import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as authApi from '@/services/api/authApi'
import {
  clearAuthStorage,
  setAccessToken,
  setRefreshToken,
  setTenantId,
  getAccessToken,
  getRefreshToken,
} from '@/services/httpClient'
import type { User } from '@/types'
import type { RootState } from '@/store'
import { normalizeApiError } from '@/services/errors'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: Boolean(getAccessToken()),
  status: 'idle',
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: authApi.LoginPayload, { rejectWithValue }) => {
    try {
      return await authApi.login(payload)
    } catch (e) {
      return rejectWithValue(normalizeApiError(e).message)
    }
  },
)

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    return await authApi.fetchMe()
  } catch (e) {
    return rejectWithValue(normalizeApiError(e).message)
  }
})

export const refreshSession = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const token = getRefreshToken()
    if (!token) return rejectWithValue('No refresh token')
    try {
      const tokens = await authApi.refreshToken(token)
      setAccessToken(tokens.accessToken)
      setRefreshToken(tokens.refreshToken)
      const state = getState() as RootState
      if (state.auth.user?.tenantId) setTenantId(state.auth.user.tenantId)
      return tokens.accessToken
    } catch (e) {
      return rejectWithValue(normalizeApiError(e).message)
    }
  },
)

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await authApi.logout()
  } finally {
    clearAuthStorage()
    setTenantId(null)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.isAuthenticated = true
        setAccessToken(action.payload.tokens.accessToken)
        setRefreshToken(action.payload.tokens.refreshToken)
        setTenantId(action.payload.user.tenantId)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) ?? 'Login failed'
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        setTenantId(action.payload.tenantId)
      })
      .addCase(fetchMe.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
        clearAuthStorage()
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.status = 'idle'
      })
  },
})

export const { clearAuthError } = authSlice.actions
export const authReducer = authSlice.reducer
export const selectAuth = (state: RootState): AuthState => state.auth
export const selectUser = (state: RootState): User | null => state.auth.user
export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated
