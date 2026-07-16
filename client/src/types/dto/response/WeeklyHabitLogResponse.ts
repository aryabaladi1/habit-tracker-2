export interface WeeklyHabitLogResponse {
    id: number;
    habitId: number;
    weeklyGoal?: number | null;
    dailyGoal?: number | null;
    minutesDone: number;
    weeklyImbalance?: number | null;
    notes?: string | null;
    weekStart: string;
    weekEnd: string;
}