import { toast } from 'sonner'
import { normalizeApiError } from '@/services/errors'

export function handleThunkError(error: unknown): string {
  const normalized = normalizeApiError(error)
  toast.error(normalized.message)
  return normalized.message
}
