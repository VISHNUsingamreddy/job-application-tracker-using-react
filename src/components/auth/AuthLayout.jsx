import {BriefcaseBusiness, CheckCircle2} from 'lucide-react';
import {Outlet} from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[1fr_1.05fr]">
      <section className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-xl bg-blue-600">
            <BriefcaseBusiness aria-hidden="true" className="size-6" />
          </div>
          <span className="text-lg font-bold">Job Application Tracker</span>
        </div>

        <div className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">A clearer job search</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight">
            Turn every application into a confident next step.
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Keep roles, statuses, and progress in one focused dashboard built for your career journey.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-slate-200">
            {['Track every opportunity', 'See progress at a glance', 'Keep your workflow private and local'].map((benefit) => (
              <li className="flex items-center gap-3" key={benefit}>
                <CheckCircle2 aria-hidden="true" className="size-5 text-emerald-400" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-400">Portfolio demo · Authentication data stays in this browser</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-600 text-white">
              <BriefcaseBusiness aria-hidden="true" className="size-5" />
            </div>
            <span className="font-bold text-slate-950">Job Application Tracker</span>
          </div>
          <Outlet />
        </div>
      </section>
    </main>
  );
}
