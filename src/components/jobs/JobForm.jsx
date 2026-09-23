import {Check, Plus, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {getToday, JOB_STATUSES} from '../../utils/jobs';
import FormField from '../ui/FormField';
import {jobInputClass} from './jobStyles';

export default function JobForm({editingApplication, onSave, onCancelEdit}) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState(getToday);
  const [status, setStatus] = useState('Applied');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (editingApplication) {
      setCompany(editingApplication.company);
      setRole(editingApplication.role);
      setDate(editingApplication.date);
      setStatus(editingApplication.status);
      setErrors({});
      setSuccessMessage('');
    }
  }, [editingApplication]);

  useEffect(() => {
    if (!successMessage) return;
    const timeout = window.setTimeout(() => setSuccessMessage(''), 3000);
    return () => window.clearTimeout(timeout);
  }, [successMessage]);

  function resetForm() {
    setCompany('');
    setRole('');
    setDate(getToday());
    setStatus('Applied');
    setErrors({});
  }

  function handleCancel() {
    resetForm();
    onCancelEdit();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!company.trim()) nextErrors.company = 'Company name is required.';
    if (!role.trim()) nextErrors.role = 'Job role is required.';
    if (!date) nextErrors.date = 'Application date is required.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const wasEditing = editingApplication !== null;
    const companyName = company.trim();
    onSave({company: companyName, role: role.trim(), date, status});
    resetForm();
    setSuccessMessage(`${wasEditing ? 'Updated' : 'Added'} application for "${companyName}".`);
  }

  return (
    <aside id="job-form" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-bold">{editingApplication ? 'Edit application' : 'Add an application'}</h2>
        <p className="mt-1 text-sm text-slate-500">
          {editingApplication ? 'Update this opportunity’s details.' : 'Save a role you applied for.'}
        </p>
      </div>
      <form className="space-y-5 p-6" noValidate onSubmit={handleSubmit}>
        {successMessage && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800" role="status">
            {successMessage}
          </div>
        )}

        <FormField id="company" label="Company name" error={errors.company}>
          <input
            id="company"
            className={jobInputClass(errors.company)}
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
              setErrors((current) => ({...current, company: undefined}));
            }}
            placeholder="e.g. Google"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'company-error' : undefined}
          />
        </FormField>

        <FormField id="role" label="Job role" error={errors.role}>
          <input
            id="role"
            className={jobInputClass(errors.role)}
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
              setErrors((current) => ({...current, role: undefined}));
            }}
            placeholder="e.g. Frontend Developer"
            autoComplete="off"
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? 'role-error' : undefined}
          />
        </FormField>

        <FormField id="date" label="Application date" error={errors.date}>
          <input
            id="date"
            type="date"
            className={jobInputClass(errors.date)}
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setErrors((current) => ({...current, date: undefined}));
            }}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
        </FormField>

        <FormField id="status" label="Application status">
          <select
            id="status"
            className={jobInputClass()}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {JOB_STATUSES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </FormField>

        <div className="flex gap-2">
          <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" type="submit">
            {editingApplication ? <Check aria-hidden="true" className="size-4" /> : <Plus aria-hidden="true" className="size-4" />}
            {editingApplication ? 'Save changes' : 'Add application'}
          </button>
          {editingApplication && (
            <button
              type="button"
              className="grid size-11 place-items-center rounded-lg border border-slate-300 text-slate-600 transition hover:bg-slate-50"
              onClick={handleCancel}
              aria-label="Cancel editing"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          )}
        </div>
      </form>
    </aside>
  );
}
