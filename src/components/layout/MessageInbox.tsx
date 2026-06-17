import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { Button } from '@/ui'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMessagesInbox } from '@/queries/notifications/queries'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

export function MessageInbox(): React.JSX.Element {
  const { data: messages = [], isLoading } = useMessagesInbox()
  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Messages">
          <Mail className="h-4 w-4" />
          {unreadCount > 0 ? (
            <Badge
              className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center px-1 text-[10px]"
              variant="destructive"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <PopoverHeader className="border-b border-border px-4 py-3">
          <PopoverTitle>Messages</PopoverTitle>
        </PopoverHeader>
        <ScrollArea className="max-h-72">
          {isLoading ? (
            <p className="p-4 text-sm text-muted-foreground">Loading...</p>
          ) : messages.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">No messages</p>
          ) : (
            <ul className="divide-y divide-border">
              {messages.slice(0, 8).map((message) => (
                <li
                  key={message.id}
                  className={cn('px-4 py-3 text-sm', !message.read && 'bg-muted/50')}
                >
                  <p className="font-medium">{message.from}</p>
                  <p className="truncate text-xs text-muted-foreground">{message.subject}</p>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
        <div className="border-t border-border p-2">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <Link to={ROUTES.notifications}>View all messages</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
