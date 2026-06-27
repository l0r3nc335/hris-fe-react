export const ROLES = {
  superadmin: 'superadmin',
  admin: 'admin',
  user: 'user',
} as const

export type UserRole = (typeof ROLES)[keyof typeof ROLES]

export function isSuperAdmin(role: string): boolean {
  return role === ROLES.superadmin
}
