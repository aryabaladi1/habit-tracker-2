export interface WeeklyHabitLogRequest {
    weeklyGoal?: number | null;
    notes?: string | null;
    weekStart: string;
    weekEnd: string
}