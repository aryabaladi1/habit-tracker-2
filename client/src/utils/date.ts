export function formatLocalDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
}

export function formatDate(date: Date) {
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

export function getWeekDates(start: Date) {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
}

export function getWeekNumber(date: Date) {
    const target = new Date(date.valueOf());

    const firstThursday = new Date(target.getFullYear(), 0, 4);

    const diff =
      target.getTime() - getMonday(firstThursday).getTime();

    return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}