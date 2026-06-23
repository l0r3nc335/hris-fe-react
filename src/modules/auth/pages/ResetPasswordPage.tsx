import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from '@/services/api/authApi'
import { Button, Input, Label } from '@/ui'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import { PublicPageShell } from '@/modules/public/pages/PublicPageShell'
import { ROUTES } from '@/constants/routes'
import { resetPasswordSchema, type ResetPasswordFormData } from '../schemas'

export function ResetPasswordPage(): React.JSX.Element {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = (data: ResetPasswordFormData): void => {
    if (!token) {
      setError('Invalid or missing reset token.')
      return
    }
    setError(null)
    setIsSubmitting(true)
    void resetPassword({ token, password: data.password })
      .then(() => {
        navigate(ROUTES.login, { replace: true })
      })
      .catch(() => {
        setError('Failed to reset password. The link may have expired.')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <PublicPageShell title="Reset password" description="Enter your new password below">
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-6">
          {!token ? (
          <Alert variant="destructive">
            <AlertDescription>
              Invalid reset link. Please request a new password reset.
            </AlertDescription>
          </Alert>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e)
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <Input id="password" type="password" {...form.register('password')} />
              {form.formState.errors.password ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...form.register('confirmPassword')}
              />
              {form.formState.errors.confirmPassword ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.confirmPassword.message}
                </p>
              ) : null}
            </div>
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Resetting...' : 'Reset password'}
            </Button>
          </form>
        )}
        <Link to={ROUTES.login} className="mt-4 inline-block text-sm text-primary hover:underline">
          Back to login
        </Link>
        </CardContent>
      </Card>
    </PublicPageShell>
  )
}
