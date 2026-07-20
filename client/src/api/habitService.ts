import { api } from "./axiosInstance";
import type { HabitCreateRequest } from "../types/dto/request/HabitCreateRequest";
import type { HabitUpdateRequest } from "../types/dto/request/HabitUpdateRequest";
import type { HabitResponse } from "../types/dto/response/HabitResponse";

export async function createHabit(
  data: HabitCreateRequest
): Promise<HabitResponse> {
  const res = await api.post<HabitResponse>("/v1/habits", data);
  return res.data;
}

export async function updateHabit(
  habitId: number,
  data: HabitUpdateRequest
): Promise<HabitResponse> {
  const res = await api.patch<HabitResponse>(`/v1/habits/${habitId}`, data);
  return res.data;
}

export async function archiveHabit(habitId: number): Promise<HabitResponse> {
  const res = await api.patch<HabitResponse>(
    `/v1/habits/${habitId}/archive`,
    undefined
  );
  return res.data;
}

export async function unarchiveHabit(habitId: number): Promise<HabitResponse> {
  const res = await api.patch<HabitResponse>(
    `/v1/habits/${habitId}/unarchive`,
    undefined
  );
  return res.data;
}

export async function getHabit(habitId: number): Promise<HabitResponse> {
  const res = await api.get<HabitResponse>(`/v1/habits/${habitId}`);
  return res.data;
}

export async function getAllHabits(): Promise<HabitResponse[]> {
  const res = await api.get<HabitResponse[]>("/v1/habits");
  return res.data;
}
