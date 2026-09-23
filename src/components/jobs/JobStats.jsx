import {JOB_STATUSES} from '../../utils/jobs';
import {statusStyles} from './jobStyles';

export default function JobStats({applications}) {
  const counts = {
    total: applications.length,
    Applied: 0,
    Interview: 0,
    Selected: 0,
    Rejected: 0,
  };

  applications.forEach((application) => {
    counts[application.status] += 1;
  });

  const statistics = [
    {label: 'Total applications', value: counts.total, dot: 'bg-violet-500'},
    ...JOB_STATUSES.map((status) => ({
      label: status,
      value: counts[status],
      dot: statusStyles[status].dot,
    })),
  ];

  return (
    <section aria-label="Application statistics" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {statistics.map((item) => (
        <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
            <span aria-hidden="true" className={`size-2 rounded-full ${item.dot}`} />
          </div>
          <p className="mt-2 text-3xl font-bold tracking-tight">{item.value}</p>
        </article>
      ))}
    </section>
  );
}
