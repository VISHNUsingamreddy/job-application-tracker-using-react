import {Building2, CalendarDays, Pencil, Trash2} from 'lucide-react';
import {formatApplicationDate} from '../../utils/jobs';
import {statusStyles} from './jobStyles';

export default function JobCard({application, onEdit, onDelete}) {
  return (
    <article className="flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company</p>
          <h3 className="mt-1 break-words text-lg font-bold">{application.company}</h3>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[application.status].badge}`}>
          {application.status}
        </span>
      </div>
      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <Building2 aria-hidden="true" className="size-4 shrink-0 text-slate-400" />
          <span className="font-medium text-slate-800">{application.role}</span>
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-slate-400" />
          Applied {formatApplicationDate(application.date)}
        </p>
      </div>
      <div className="mt-auto flex justify-end gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={() => onEdit(application)}
          aria-label={`Edit ${application.company} application`}
        >
          <Pencil aria-hidden="true" className="size-3.5" />
          Edit
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          onClick={() => onDelete(application)}
          aria-label={`Delete ${application.company} application`}
        >
          <Trash2 aria-hidden="true" className="size-3.5" />
          Delete
        </button>
      </div>
    </article>
  );
}
