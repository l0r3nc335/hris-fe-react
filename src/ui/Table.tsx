import { cn } from '@/utils/cn'

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>): React.JSX.Element {
  return (
    <div className="w-full overflow-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
}

export function TableHeader(props: React.HTMLAttributes<HTMLTableSectionElement>): React.JSX.Element {
  return <thead className="border-b border-border" {...props} />
}

export function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>): React.JSX.Element {
  return <tbody {...props} />
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>): React.JSX.Element {
  return <tr className={cn('border-b border-border transition-colors hover:bg-muted/50', className)} {...props} />
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>): React.JSX.Element {
  return (
    <th
      className={cn('h-10 px-4 text-left align-middle font-medium text-muted-foreground', className)}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>): React.JSX.Element {
  return <td className={cn('p-4 align-middle', className)} {...props} />
}
