import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function RegisterPage(): React.JSX.Element {
  return (
    <div>
      <h1 className="text-2xl font-bold">Register</h1>
      <p className="mt-2 text-sm text-muted-foreground">Registration form scaffold — connect to auth/register API.</p>
      <Link to={ROUTES.login} className="mt-4 inline-block text-sm text-primary hover:underline">
        Back to login
      </Link>
    </div>
  )
}
