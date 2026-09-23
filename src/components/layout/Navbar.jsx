import {BriefcaseBusiness, LogOut} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';

export default function Navbar() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', {replace: true});
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
            <BriefcaseBusiness aria-hidden="true" className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-bold tracking-tight text-slate-950">Job Application Tracker</p>
            <p className="hidden truncate text-xs text-slate-500 sm:block">Keep your search organized and moving forward.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">{user?.fullName}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={handleLogout}
          >
            <LogOut aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Log out</span>
            <span className="sr-only sm:hidden">Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
