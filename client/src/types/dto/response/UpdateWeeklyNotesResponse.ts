export interface UpdateWeeklyNotesResponse {
    id: number;
    habitId: number;
    notes?: string | null;
    weekStart: string;
    weekEnd: string;
}