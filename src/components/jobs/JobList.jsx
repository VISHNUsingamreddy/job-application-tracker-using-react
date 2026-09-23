import {BriefcaseBusiness} from 'lucide-react';
import JobCard from './JobCard';

export default function JobList({
  applications,
  hasFilters,
  onEdit,
  onDelete,
  onResetFilters,
}) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2" aria-live="polite">
      {applications.map((application) => (
        <JobCard
          key={application.id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {applications.length === 0 && (
        <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-14 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-slate-100 text-slate-500">
            <BriefcaseBusiness aria-hidden="true" className="size-6" />
          </div>
          <h3 className="mt-4 font-bold">{hasFilters ? 'No matching applications' : 'No applications yet'}</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            {hasFilters
              ? 'Try a different company, role, or status.'
              : 'Add your first application with the form to start tracking your search.'}
          </p>
          {hasFilters && (
            <button type="button" className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-800" onClick={onResetFilters}>
              Clear search and filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
