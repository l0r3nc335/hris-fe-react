import type { OrgChartNode } from '@/services/api/orgApi'
import { cn } from '@/utils/cn'
import { ChevronDown, ChevronRight, User } from 'lucide-react'
import { useState } from 'react'

interface OrgChartTreeProps {
  nodes: OrgChartNode[]
  className?: string
}

function OrgChartNodeItem({ node, depth = 0 }: { node: OrgChartNode; depth?: number }): React.JSX.Element {
  const [expanded, setExpanded] = useState(depth < 2)
  const hasChildren = node.children && node.children.length > 0

  return (
    <li className="list-none">
      <div
        className={cn(
          'flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/50',
          depth > 0 && 'ml-4 border-l border-border pl-3',
        )}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-muted-foreground"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <span className="w-4" />
        )}
        <User className="h-4 w-4 text-primary" />
        <div>
          <p className="text-sm font-medium">{node.name}</p>
          <p className="text-xs text-muted-foreground">{node.title}</p>
        </div>
      </div>
      {hasChildren && expanded ? (
        <ul className="mt-1 space-y-1">
          {node.children!.map((child) => (
            <OrgChartNodeItem key={child.id} node={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function OrgChartTree({ nodes, className }: OrgChartTreeProps): React.JSX.Element {
  if (nodes.length === 0) {
    return <p className="text-sm text-muted-foreground">No organization data available.</p>
  }

  return (
    <ul className={cn('space-y-1', className)}>
      {nodes.map((node) => (
        <OrgChartNodeItem key={node.id} node={node} />
      ))}
    </ul>
  )
}
