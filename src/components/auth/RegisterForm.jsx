import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import {isValidEmail, MIN_PASSWORD_LENGTH, validatePassword} from '../../utils/validation';
import FormField from '../ui/FormField';
import PasswordInput from './PasswordInput';
import {authInputClass, authSubmitClass} from './authStyles';

export default function RegisterForm() {
  const {register} = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!isValidEmail(email)) nextErrors.email = 'Enter a valid email address.';
    nextErrors.password = validatePassword(password);
    if (!confirmPassword) nextErrors.confirmPassword = 'Please confirm your password.';
    else if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setLoading(true);
    const result = await register({fullName, email, password});
    setLoading(false);

    if ('message' in result) {
      setErrors({form: result.message});
      return;
    }

    navigate('/login', {
      replace: true,
      state: {registrationSuccess: 'Account created successfully. Sign in to continue.'},
    });
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <p className="text-sm font-semibold text-blue-700">Get started</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Create your account</h2>
        <p className="mt-2 text-sm text-slate-500">Set up your local portfolio demo account.</p>
      </div>

      {errors.form && (
        <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700" role="alert">
          {errors.form}
        </div>
      )}

      <form className="mt-6 space-y-4" noValidate onSubmit={handleSubmit}>
        <FormField id="register-name" label="Full name" error={errors.fullName}>
          <input
            id="register-name"
            className={authInputClass(errors.fullName)}
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
              setErrors((current) => ({...current, fullName: undefined, form: undefined}));
            }}
            placeholder="Alex Morgan"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'register-name-error' : undefined}
          />
        </FormField>

        <FormField id="register-email" label="Email address" error={errors.email}>
          <input
            id="register-email"
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
            aria-describedby={errors.email ? 'register-email-error' : undefined}
          />
        </FormField>

        <FormField
          id="register-password"
          label="Password"
          error={errors.password}
          hint={`Use at least ${MIN_PASSWORD_LENGTH} characters.`}
        >
          <PasswordInput
            id="register-password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              setErrors((current) => ({...current, password: undefined, form: undefined}));
            }}
            error={errors.password}
            autoComplete="new-password"
            placeholder="Create a password"
          />
        </FormField>

        <FormField id="register-confirm-password" label="Confirm password" error={errors.confirmPassword}>
          <PasswordInput
            id="register-confirm-password"
            value={confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
              setErrors((current) => ({...current, confirmPassword: undefined, form: undefined}));
            }}
            error={errors.confirmPassword}
            autoComplete="new-password"
            placeholder="Repeat your password"
          />
        </FormField>

        <button className={authSubmitClass} type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link className="font-semibold text-blue-700 hover:text-blue-800" to="/login">
          Sign in
        </Link>
      </p>

      <p className="mt-5 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
        Demo notice: account details are stored in this browser only. Do not use a real password.
      </p>
    </div>
  );
}
