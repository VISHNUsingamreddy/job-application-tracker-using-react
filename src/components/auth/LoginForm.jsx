import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {isValidEmail} from '../../utils/validation';
import FormField from '../ui/FormField';
import PasswordInput from './PasswordInput';
import {authInputClass, authSubmitClass} from './authStyles';

export default function LoginForm() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!isValidEmail(email)) nextErrors.email = 'Enter a valid email address.';
    if (!password) nextErrors.password = 'Password is required.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    const result = await login({email, password, rememberMe});
    setLoading(false);

    if ('message' in result) {
      setErrors({form: result.message});
      return;
    }

    navigate(locationState?.from?.pathname || '/dashboard', {replace: true});
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <p className="text-sm font-semibold text-blue-700">Welcome back</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Sign in to your account</h2>
        <p className="mt-2 text-sm text-slate-500">Continue managing your job applications.</p>
      </div>

      {locationState?.registrationSuccess && (
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800" role="status">
          {locationState.registrationSuccess}
        </div>
      )}

      {errors.form && (
        <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700" role="alert">
          {errors.form}
        </div>
      )}

      <form className="mt-6 space-y-5" noValidate onSubmit={handleSubmit}>
        <FormField id="login-email" label="Email address" error={errors.email}>
          <input
            id="login-email"
            type="email"
            className={authInputClass(errors.email)}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrors((current) => ({...current, email: undefined, form: undefined}));
            }}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
          />
        </FormField>

        <FormField id="login-password" label="Password" error={errors.password}>
          <PasswordInput
            id="login-password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              setErrors((current) => ({...current, password: undefined, form: undefined}));
            }}
            error={errors.password}
            autoComplete="current-password"
          />
        </FormField>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          Remember me on this device
        </label>

        <button className={authSubmitClass} type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        New to the tracker?{' '}
        <Link className="font-semibold text-blue-700 hover:text-blue-800" to="/register">
          Create an account
        </Link>
      </p>
    </div>
  );
}
