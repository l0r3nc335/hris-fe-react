import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { EMAIL_FIELD } from '@/constants/formFields'

describe('EntityFormDialog', () => {
  it('renders extra form fields and submits values', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <EntityFormDialog
        open
        onOpenChange={() => undefined}
        mode="create"
        title="Create user"
        onSubmit={onSubmit}
        formFields={[EMAIL_FIELD]}
      />,
    )

    await user.type(screen.getByLabelText('Name'), 'Jane Doe')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.click(screen.getByRole('button', { name: 'Create' }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'jane@example.com',
        status: 'active',
      }),
    )
  })
})
