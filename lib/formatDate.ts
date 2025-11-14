export function formatDotDate(date: string): string {
    if (date.includes(".")) return date;
    return date.replace(/-/g, ".");
  }