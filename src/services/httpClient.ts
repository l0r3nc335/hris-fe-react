import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { API_VERSION } from '@/constants/api'

const ACCESS_TOKEN_KEY = 'hris_access_token'
const REFRESH_TOKEN_KEY = 'hris_refresh_token'
const TENANT_ID_KEY = 'hris_tenant_id'

let accessToken: string | null = sessionStorage.getItem(ACCESS_TOKEN_KEY)
let tenantId: string | null = sessionStorage.getItem(TENANT_ID_KEY)

type RefreshHandler = () => Promise<string | null>
let onRefresh: RefreshHandler | null = null
let onUnauthorized: (() => void) | null = null

export function setAuthHandlers(handlers: {
  refresh: RefreshHandler
  unauthorized: () => void
}): void {
  onRefresh = handlers.refresh
  onUnauthorized = handlers.unauthorized
}

export function setAccessToken(token: string | null): void {
  accessToken = token
  if (token) sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
  else sessionStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function setRefreshToken(token: string | null): void {
  if (token) sessionStorage.setItem(REFRESH_TOKEN_KEY, token)
  else sessionStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTenantId(id: string | null): void {
  tenantId = id
  if (id) sessionStorage.setItem(TENANT_ID_KEY, id)
  else sessionStorage.removeItem(TENANT_ID_KEY)
}

export function getAccessToken(): string | null {
  return accessToken
}

export function clearAuthStorage(): void {
  accessToken = null
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
}

const baseURL = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}/api/${API_VERSION}`

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  if (tenantId) {
    config.headers['X-Tenant-Id'] = tenantId
  }
  return config
})

let isRefreshing = false
let refreshQueue: Array<(token: string | null) => void> = []

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    if (error.response?.status === 401 && !original._retry && onRefresh) {
      original._retry = true
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push((token) => {
            if (!token) {
              reject(error)
              return
            }
            original.headers.Authorization = `Bearer ${token}`
            resolve(httpClient(original))
          })
        })
      }
      isRefreshing = true
      try {
        const newToken = await onRefresh()
        refreshQueue.forEach((cb) => cb(newToken))
        refreshQueue = []
        if (!newToken) {
          onUnauthorized?.()
          return Promise.reject(error)
        }
        original.headers.Authorization = `Bearer ${newToken}`
        return httpClient(original)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  },
)

export async function request<T>(url: string, method: 'get' | 'post' | 'put' | 'patch' | 'delete' = 'get', body?: unknown): Promise<T> {
  const res = await httpClient.request<{ data: T }>({ url, method, data: body })
  return res.data.data
}
