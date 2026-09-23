import {useEffect, useMemo, useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import JobFilter from '../components/jobs/JobFilter';
import JobForm from '../components/jobs/JobForm';
import JobList from '../components/jobs/JobList';
import JobStats from '../components/jobs/JobStats';
import {createJobId} from '../utils/jobs';
import {loadApplications, saveApplications} from '../utils/storage';

export default function Dashboard() {
  const {user} = useAuth();
  const [applications, setApplications] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    let active = true;
    setLoaded(false);
    loadApplications(user.id).then((loadedApplications) => {
      if (active) {
        setApplications(loadedApplications);
        setLoaded(true);
      }
    });
    return () => { active = false; };
  }, [user.id]);

  useEffect(() => {
    if (loaded) saveApplications(user.id, applications).catch(() => {});
  }, [applications, loaded, user.id]);

  const filteredApplications = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return applications.filter((application) => {
      const matchesSearch = application.company.toLocaleLowerCase().includes(term)
        || application.role.toLocaleLowerCase().includes(term);
      const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  function saveApplication(draft) {
    if (editingApplication) {
      setApplications((current) => current.map((application) => (
        application.id === editingApplication.id ? {...application, ...draft} : application
      )));
      setEditingApplication(null);
      return;
    }

    setApplications((current) => [{id: createJobId(), ...draft}, ...current]);
  }

  function editApplication(application) {
    setEditingApplication(application);
    window.setTimeout(() => document.getElementById('job-form')?.scrollIntoView({behavior: 'smooth', block: 'start'}));
  }

  function deleteApplication(application) {
    if (!window.confirm(`Delete the application for "${application.company}"?`)) return;
    setApplications((current) => current.filter(({id}) => id !== application.id));
    if (editingApplication?.id === application.id) setEditingApplication(null);
  }

  function resetFilters() {
    setSearch('');
    setStatusFilter('all');
  }

  const hasFilters = search.trim() !== '' || statusFilter !== 'all';

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-700">Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Your application pipeline</h1>
        <p className="mt-1 text-sm text-slate-500">Add opportunities, update progress, and focus on what comes next.</p>
      </div>

      <JobStats applications={applications} />

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[23rem_1fr]">
        <JobForm
          editingApplication={editingApplication}
          onSave={saveApplication}
          onCancelEdit={() => setEditingApplication(null)}
        />

        <section aria-label="Job applications">
          <JobFilter
            search={search}
            status={statusFilter}
            shownCount={filteredApplications.length}
            totalCount={applications.length}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
            onReset={resetFilters}
          />
          <JobList
            applications={filteredApplications}
            hasFilters={hasFilters}
            onEdit={editApplication}
            onDelete={deleteApplication}
            onResetFilters={resetFilters}
          />
        </section>
      </div>
    </main>
  );
}
