import { ROUTES } from '@/constants/routes'
import type { User } from '@/types'

export function getPostLoginPath(user: User): string {
  if (user.role === 'subscriber' && !user.userSubscription) {
    return ROUTES.mySubscription
  }
  return ROUTES.home
}
