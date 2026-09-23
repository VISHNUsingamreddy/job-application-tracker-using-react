export const statusStyles = {
  Applied: {badge: 'border-blue-200 bg-blue-50 text-blue-700', dot: 'bg-blue-500'},
  Interview: {badge: 'border-amber-200 bg-amber-50 text-amber-700', dot: 'bg-amber-500'},
  Selected: {badge: 'border-emerald-200 bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500'},
  Rejected: {badge: 'border-rose-200 bg-rose-50 text-rose-700', dot: 'bg-rose-500'},
};

export function jobInputClass(error) {
  return `h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none transition placeholder:text-slate-400 focus:ring-3 ${
    error
      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100'
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
  }`;
}
