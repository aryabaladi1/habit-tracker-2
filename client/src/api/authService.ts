import { authApi } from "./axiosInstance";
import type { AuthResponse } from "../types/dto/response/AuthResponse";
import type { RegisterRequest } from "../types/dto/request/RegisterRequest";
import type { LoginRequest } from "../types/dto/request/LoginRequest";

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const res = await authApi.post<AuthResponse>("/v1/auth/login", data);
  const auth = res.data;
  if (typeof window !== "undefined") {
    localStorage.setItem("token", auth.token);
  }
  return auth;
}

export async function registerUser(
  data: RegisterRequest
): Promise<AuthResponse> {
  const res = await authApi.post<AuthResponse>("/v1/auth/register", data);
  const auth = res.data;
  if (typeof window !== "undefined") {
    localStorage.setItem("token", auth.token);
  }
  return auth;
}
