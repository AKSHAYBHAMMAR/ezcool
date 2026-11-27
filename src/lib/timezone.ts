/**
 * Utility functions for India Standard Time (Asia/Kolkata, UTC+5:30) date & time handling.
 */

/**
 * Returns the current date (YYYY-MM-DD) and 24-hour hour number in Asia/Kolkata (IST).
 * Guarantees hour is within 0..23 using standard h23 hour cycle.
 */
export function getKolkataDateTime(): { dateStr: string; hour: number } {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    hourCycle: 'h23',
  });
  const parts = formatter.formatToParts(new Date());
  const year = parts.find((p) => p.type === 'year')?.value || '1970';
  const month = parts.find((p) => p.type === 'month')?.value || '01';
  const day = parts.find((p) => p.type === 'day')?.value || '01';
  const hourStr = parts.find((p) => p.type === 'hour')?.value || '0';

  const rawHour = parseInt(hourStr, 10);
  const hour = isNaN(rawHour) ? 0 : rawHour % 24;

  return {
    dateStr: `${year}-${month}-${day}`,
    hour,
  };
}
