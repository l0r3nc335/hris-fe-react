export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface Paginated<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
  }
}

export interface ApiErrorBody {
  code: string
  message: string
  status: number
  details?: Record<string, string[]>
}
