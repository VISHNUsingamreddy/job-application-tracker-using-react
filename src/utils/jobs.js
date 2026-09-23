export const JOB_STATUSES = ['Applied', 'Interview', 'Selected', 'Rejected'];

export function getToday() {
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60_000;
  return new Date(today.getTime() - offset).toISOString().slice(0, 10);
}

export function formatApplicationDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  if (!year || !month || !day || Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function createJobId() {
  return typeof crypto.randomUUID === 'function'
    ? `app_${crypto.randomUUID()}`
    : `app_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
