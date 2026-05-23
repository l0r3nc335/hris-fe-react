export async function bootstrapMocks(): Promise<void> {
  if (import.meta.env.VITE_USE_MOCKS !== 'true') return
  const { worker } = await import('@/services/mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}
