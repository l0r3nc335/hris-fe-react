import { ROUTES } from './routes'

export interface PublicNavItem {
  label: string
  path: string
}

export const PUBLIC_NAV: PublicNavItem[] = [
  { label: 'About', path: ROUTES.about },
  { label: 'Pricing', path: ROUTES.pricing },
  { label: 'Contact Us', path: ROUTES.contact },
]
