import {JOB_STATUSES} from './jobs';
import {get, ref, set} from 'firebase/database';
import {database} from '../services/firebase';

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

export async function loadApplications(userId) {
  const snapshot = await get(ref(database, `applications/${userId}`));
  const stored = snapshot.val();
  if (stored && typeof stored === 'object') {
    const applications = Object.values(stored);
    if (applications.every(isJobApplication)) return applications;
  }
  return [];
}

export function saveApplications(userId, applications) {
  return set(ref(database, `applications/${userId}`), Object.fromEntries(
    applications.map((application) => [application.id, application]),
  ));
}
