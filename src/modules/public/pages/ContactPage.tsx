import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/ui'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PublicPageShell } from './PublicPageShell'

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'contact@hris-enterprise.com' },
  { icon: Phone, label: 'Phone', value: '+1 (800) 555-0199' },
  { icon: MapPin, label: 'Office', value: '100 Enterprise Blvd, Suite 500' },
] as const

export function ContactPage(): React.JSX.Element {
  return (
    <PublicPageShell
      title="Contact Us"
      description="Our team is ready to help you transform your HR operations."
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="space-y-3">
          {CONTACT_INFO.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
            >
              <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <p className="text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          className="rounded-lg border border-border bg-card p-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" placeholder="Your name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" placeholder="you@company.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-message">Message</Label>
              <textarea
                id="contact-message"
                rows={3}
                placeholder="How can we help?"
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </PublicPageShell>
  )
}
