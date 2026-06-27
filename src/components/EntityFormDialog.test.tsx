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

  it('renders split name fields and submits first and last name', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <EntityFormDialog
        open
        onOpenChange={() => undefined}
        mode="create"
        title="Create user"
        nameFields="split"
        onSubmit={onSubmit}
        formFields={[EMAIL_FIELD]}
      />,
    )

    await user.type(screen.getByLabelText('First name'), 'Jane')
    await user.type(screen.getByLabelText('Last name'), 'Doe')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.click(screen.getByRole('button', { name: 'Create' }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        status: 'active',
      }),
    )
  })

  it('prefills split name fields in edit mode', () => {
    render(
      <EntityFormDialog
        open
        onOpenChange={() => undefined}
        mode="edit"
        title="Edit user"
        nameFields="split"
        initialValues={{ firstName: 'Jane', lastName: 'Doe', status: 'active' }}
        onSubmit={() => undefined}
      />,
    )

    expect(screen.getByLabelText('First name')).toHaveValue('Jane')
    expect(screen.getByLabelText('Last name')).toHaveValue('Doe')
  })
})
