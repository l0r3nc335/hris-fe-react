import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function ForgotPasswordPage(): React.JSX.Element {
  return (
    <div>
      <h1 className="text-2xl font-bold">Forgot password</h1>
      <p className="mt-2 text-sm text-muted-foreground">Password reset scaffold — connect to auth/forgot-password API.</p>
      <Link to={ROUTES.login} className="mt-4 inline-block text-sm text-primary hover:underline">
        Back to login
      </Link>
    </div>
  )
}
