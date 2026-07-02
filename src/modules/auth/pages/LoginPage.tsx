import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { login, selectAuth, selectIsAuthenticated } from '@/slices/authSlice'
import { Button } from '@/ui'
import { Input } from '@/ui'
import { Card, CardContent } from '@/components/ui/card'
import { PublicPageShell } from '@/modules/public/pages/PublicPageShell'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ROUTES } from '@/constants/routes'
import { loginSchema, type LoginFormData } from '../schemas'

export function LoginPage(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const { status, error } = useAppSelector(selectAuth)
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  if (isAuthenticated) return <Navigate to={ROUTES.home} replace />

  const onSubmit = (data: LoginFormData): void => {
    void dispatch(login(data))
      .then((result) => {
        if (login.fulfilled.match(result)) navigate(ROUTES.home)
      })
      .catch(() => undefined)
  }

  return (
    <PublicPageShell
      title="Sign in"
      description="Enterprise HRIS — sign in with your account"
    >
      <Card className="mx-auto max-w-md">
        <CardContent className="pt-6">
          <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e)
            }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Form>
        <div className="mt-4 flex justify-between text-sm">
          <Link to={ROUTES.forgotPassword} className="text-primary hover:underline">
            Forgot password?
          </Link>
          <Link to={ROUTES.register} className="text-primary hover:underline">
            Create account
          </Link>
        </div>
        </CardContent>
      </Card>
    </PublicPageShell>
  )
}
