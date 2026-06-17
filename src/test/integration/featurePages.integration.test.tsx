import { screen, waitFor } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import { FEATURE_PAGES } from '@/test/features'
import { renderWithProviders } from '@/test/utils'
import { seedAuthFromApi } from './helpers'

describe('feature pages integration', () => {
  beforeAll(async () => {
    await seedAuthFromApi()
  })
  it.each(FEATURE_PAGES)('$slug page renders $title heading', async ({ title, load }) => {
    const { default: Page } = await load()
    renderWithProviders(<Page />)

    await waitFor(
      () => {
        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
      },
      { timeout: 15000 },
    )
  })

  it.each(FEATURE_PAGES.filter((feature) => feature.kind === 'crud'))(
    '$slug page shows Add action',
    async ({ title, load }) => {
      const { default: Page } = await load()
      renderWithProviders(<Page />)

      await waitFor(
        () => {
          expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
        },
        { timeout: 15000 },
      )

      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    },
  )
})
