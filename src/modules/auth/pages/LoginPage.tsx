import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { login, selectAuth } from '@/slices/authSlice'
import { Button, Input } from '@/ui'
import { FormField } from '@/components/FormField'
import { ROUTES } from '@/constants/routes'

const schema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

export function LoginPage(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector(selectAuth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormData): void => {
    void dispatch(login(data)).then((result) => {
      if (login.fulfilled.match(result)) navigate(ROUTES.home)
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Sign in</h1>
      <p className="mt-1 text-sm text-muted-foreground">Enterprise HRIS — demo: admin@hris.com / password</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Email" error={errors.email?.message}>
          <Input type="email" {...register('email')} defaultValue="admin@hris.com" />
        </FormField>
        <FormField label="Password" error={errors.password?.message}>
          <Input type="password" {...register('password')} defaultValue="password" />
        </FormField>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <Link to={ROUTES.forgotPassword} className="text-primary hover:underline">
          Forgot password?
        </Link>
        <Link to={ROUTES.register} className="text-primary hover:underline">
          Register
        </Link>
      </div>
    </div>
  )
}
