import { Badge } from '@/components/ui/badge'

export interface StatusBadgeProps {
  status: string
}

function statusVariant(status: string): 'default' | 'secondary' | 'destructive' {
  const normalized = status.toLowerCase()
  if (normalized === 'active' || normalized === 'approved' || normalized === 'completed') {
    return 'default'
  }
  if (normalized === 'inactive' || normalized === 'rejected' || normalized === 'cancelled') {
    return 'destructive'
  }
  return 'secondary'
}

export function StatusBadge({ status }: StatusBadgeProps): React.JSX.Element {
  return <Badge variant={statusVariant(status)}>{status}</Badge>
}
