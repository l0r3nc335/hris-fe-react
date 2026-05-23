import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { bootstrapMocks } from '@/app/bootstrap'
import { App } from '@/app/App'
import './index.css'

async function main(): Promise<void> {
  await bootstrapMocks()
  const root = document.getElementById('root')
  if (!root) throw new Error('Root element not found')
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void main()
