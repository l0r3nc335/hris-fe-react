import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from '@/ui/Tabs'

describe('Tabs', () => {
  it('renders tab items and switches content', async () => {
    const user = userEvent.setup()
    render(
      <Tabs
        defaultValue="a"
        items={[
          { value: 'a', label: 'Tab A', content: <p>Content A</p> },
          { value: 'b', label: 'Tab B', content: <p>Content B</p> },
        ]}
      />,
    )

    expect(screen.getByText('Content A')).toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: 'Tab B' }))
    expect(screen.getByText('Content B')).toBeInTheDocument()
  })

  it('supports controlled mode', () => {
    const { rerender } = render(
      <Tabs
        value="a"
        onValueChange={() => undefined}
        items={[
          { value: 'a', label: 'Tab A', content: <p>Content A</p> },
          { value: 'b', label: 'Tab B', content: <p>Content B</p> },
        ]}
      />,
    )

    expect(screen.getByText('Content A')).toBeInTheDocument()
    rerender(
      <Tabs
        value="b"
        onValueChange={() => undefined}
        items={[
          { value: 'a', label: 'Tab A', content: <p>Content A</p> },
          { value: 'b', label: 'Tab B', content: <p>Content B</p> },
        ]}
      />,
    )
    expect(screen.getByText('Content B')).toBeInTheDocument()
  })
})
