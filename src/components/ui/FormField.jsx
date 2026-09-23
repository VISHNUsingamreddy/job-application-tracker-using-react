export default function FormField({
  id,
  label,
  error,
  hint,
  required = true,
  children,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-rose-600" aria-hidden="true">*</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-rose-600" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500" id={`${id}-hint`}>{hint}</p>
      ) : null}
    </div>
  );
}
