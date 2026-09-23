import {Eye, EyeOff} from 'lucide-react';
import {useState} from 'react';
import {authInputClass} from './authStyles';

export default function PasswordInput({
  id,
  value,
  onChange,
  error,
  autoComplete,
  placeholder = 'Enter your password',
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        className={`${authInputClass(error)} pr-11`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button
        type="button"
        className="absolute right-0 top-0 grid size-11 place-items-center rounded-r-lg text-slate-500 transition hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
      >
        {visible ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
      </button>
    </div>
  );
}
