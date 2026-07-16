import { api } from "./axiosInstance";

import type { DailyHabitLogRequest } from "../types/dto/request/DailyHabitLogRequest";
import type { DailyHabitLogResponse } from "../types/dto/response/DailyHabitLogResponse";
import type { UpdateWeeklyGoalRequest } from "../types/dto/request/UpdateWeeklyGoalRequest";
import type { WeeklyHabitLogResponse } from "../types/dto/response/WeeklyHabitLogResponse";
import type { FullHabitLogsForWeek } from "../types/dto/response/FullHabitLogsForWeek";

export async function saveDailyHabitLog(
    habitId: number,
    data: DailyHabitLogRequest
): Promise<DailyHabitLogResponse> {
    const res = await api.put<DailyHabitLogResponse>(`/v1/logs/daily/${habitId}`, data);
    return res.data;
}

export async function updateWeeklyGoal(
    habitId: number,
    data: UpdateWeeklyGoalRequest
): Promise<WeeklyHabitLogResponse> {
    const res = await api.put<WeeklyHabitLogResponse>(`/v1/logs/weekly/${habitId}/goal`, data);
    return res.data;
}

export async function getDailyHabitLog(
    habitId: number,
    date: string
): Promise<DailyHabitLogResponse> {
    const res = await api.get<DailyHabitLogResponse>(`/v1/logs/daily`, {
        params: { habitId, date },
    });
    return res.data;
}

export async function getFullHabitLogsForWeek(
    weekStart: string,
    weekEnd: string
): Promise<FullHabitLogsForWeek[]> {
    const res = await api.get<FullHabitLogsForWeek[]>(`/v1/logs/week`, {
        params: { weekStart, weekEnd },
    });
    return res.data;
}
