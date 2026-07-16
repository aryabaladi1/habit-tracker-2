export interface DailyHabitLogResponse {
    habitId: number;
    minutesDone: number;
    notes?: string | null;
    date: string;
}