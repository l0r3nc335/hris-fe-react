import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/utils/cn'

export function Tabs({
  defaultValue,
  items,
}: {
  defaultValue: string
  items: { value: string; label: string; content: React.ReactNode }[]
}): React.JSX.Element {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue}>
      <TabsPrimitive.List className="inline-flex h-10 items-center gap-1 rounded-md bg-muted p-1">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm',
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content key={item.value} value={item.value} className="mt-4">
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
