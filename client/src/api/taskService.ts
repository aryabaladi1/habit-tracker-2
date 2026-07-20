import { api } from "./axiosInstance";
import type { TaskCreateRequest } from "../types/dto/request/TaskCreateRequest";
import type { TaskUpdateRequest } from "../types/dto/request/TaskUpdateRequest";
import type { TaskResponse } from "../types/dto/response/TaskResponse";

export async function createTask(
  data: TaskCreateRequest
): Promise<TaskResponse> {
  const res = await api.post<TaskResponse>("/v1/tasks", data);
  return res.data;
}

export async function updateTask(
  taskId: number,
  data: TaskUpdateRequest
): Promise<TaskResponse> {
  const res = await api.patch<TaskResponse>(`/v1/tasks/${taskId}`, data);
  return res.data;
}

export async function getTask(taskId: number): Promise<TaskResponse> {
  const res = await api.get<TaskResponse>(`/v1/tasks/${taskId}`);
  return res.data;
}

export async function getAllTasks(): Promise<TaskResponse[]> {
  const res = await api.get<TaskResponse[]>("/v1/tasks");
  return res.data;
}
