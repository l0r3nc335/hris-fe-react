import type { ReactNode } from 'react'
import { Tabs as TabsRoot, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export interface TabsItem {
  value: string
  label: string
  content: ReactNode
}

export interface TabsProps {
  defaultValue: string
  items: TabsItem[]
}

export function Tabs({ defaultValue, items }: TabsProps): React.JSX.Element {
  return (
    <TabsRoot defaultValue={defaultValue}>
      <TabsList>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </TabsRoot>
  )
}
