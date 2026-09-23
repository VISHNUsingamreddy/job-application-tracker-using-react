import {JOB_STATUSES} from './jobs';

const APPLICATIONS_KEY = 'job_tracker_applications_v1';

const SAMPLE_APPLICATIONS = [
  {
    id: 'app_1',
    company: 'Google',
    role: 'Associate Software Engineer',
    date: '2026-08-20',
    status: 'Interview',
  },
  {
    id: 'app_2',
    company: 'Stripe',
    role: 'Frontend Developer',
    date: '2026-08-28',
    status: 'Applied',
  },
  {
    id: 'app_3',
    company: 'Microsoft',
    role: 'Junior Web Developer',
    date: '2026-08-15',
    status: 'Selected',
  },
  {
    id: 'app_4',
    company: 'Amazon',
    role: 'Software Development Engineer I',
    date: '2026-08-10',
    status: 'Rejected',
  },
];

export function readStorage(key, fallback, target = localStorage) {
  try {
    const stored = target.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value, target = localStorage) {
  try {
    target.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key, target = localStorage) {
  try {
    target.removeItem(key);
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
}

function isJobApplication(value) {
  if (!value || typeof value !== 'object') return false;

  const application = value;
  return (
    typeof application.id === 'string' &&
    typeof application.company === 'string' &&
    typeof application.role === 'string' &&
    typeof application.date === 'string' &&
    JOB_STATUSES.includes(application.status)
  );
}

export function loadApplications() {
  const stored = readStorage(APPLICATIONS_KEY, null);
  if (Array.isArray(stored) && stored.every(isJobApplication)) return stored;
  return SAMPLE_APPLICATIONS.map((application) => ({...application}));
}

export function saveApplications(applications) {
  writeStorage(APPLICATIONS_KEY, applications);
}
