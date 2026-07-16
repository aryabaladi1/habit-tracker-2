export interface UpdateWeeklyGoalRequest {
    weeklyGoal?: number | null;
    weekStart: string;
    weekEnd: string
}