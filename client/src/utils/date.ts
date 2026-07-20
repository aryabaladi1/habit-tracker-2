export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatMonthDay(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function getMonday(date: Date) {
  const d = new Date(date);

  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);

  return d;
}

export function getMondayOfISOWeek(year: number, week: number): Date {
  const jan4 = new Date(year, 0, 4);

  const monday = getMonday(jan4);

  monday.setDate(monday.getDate() + (week - 1) * 7);

  return monday;
}

export function getISOYear(date: Date): number {
  const tempDate = new Date(date);

  tempDate.setHours(0, 0, 0, 0);

  // Move to Thursday of the current ISO week
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

  return tempDate.getFullYear();
}

export function getWeekDates(start: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export function getISOWeek(date: Date): number {
  const tempDate = new Date(date);

  tempDate.setHours(0, 0, 0, 0);

  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

  const week1 = new Date(tempDate.getFullYear(), 0, 4);

  return (
    1 +
    Math.round(
      ((tempDate.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}

export function getISOWeeksInYear(year: number): number {
  const d = new Date(year, 11, 31);

  const week = getISOWeek(d);

  return week === 1 ? 52 : week;
}
