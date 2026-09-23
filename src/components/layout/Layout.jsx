import {Outlet} from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <Outlet />
      <footer className="mx-auto max-w-7xl px-4 pb-8 pt-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        Job Application Tracker · Built with React and Tailwind CSS
      </footer>
    </div>
  );
}
