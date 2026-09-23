import {RotateCcw, Search} from 'lucide-react';
import {JOB_STATUSES} from '../../utils/jobs';

export default function JobFilter({
  search,
  status,
  shownCount,
  totalCount,
  onSearchChange,
  onStatusChange,
  onReset,
}) {
  const hasFilters = search.trim() !== '' || status !== 'all';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search by company or role</span>
          <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
            placeholder="Search company or role..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Filter by status</span>
          <select
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-100 sm:w-44"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="all">All statuses</option>
            {JOB_STATUSES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <button
          type="button"
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onReset}
          disabled={!hasFilters}
        >
          <RotateCcw aria-hidden="true" className="size-4" />
          Reset
        </button>
      </div>
      <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-500" aria-live="polite">
        Showing {shownCount} of {totalCount} {totalCount === 1 ? 'application' : 'applications'}
      </p>
    </div>
  );
}
