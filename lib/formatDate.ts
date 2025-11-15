export function formatDotDate(date: string): string {
  const pureDate = date.split(' ')[0];
  if (pureDate.includes('.')) return pureDate;
  return pureDate.replace(/-/g, '.');
}
