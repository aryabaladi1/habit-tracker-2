export interface DailyHabitLogRequest {
    minutesDone?: number | null;
    notes?: string | null;
    date: string;
}