import { ErrorBoundary } from '@/components/ErrorBoundary'

export function ErrorBoundaryProvider({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <ErrorBoundary>{children}</ErrorBoundary>
}
