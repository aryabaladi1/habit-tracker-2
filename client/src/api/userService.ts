import { api } from "./axiosInstance";
import type { UserResponse } from "../types/dto/response/UserResponse";
import type { UserUpdateRequest } from "../types/dto/request/UserUpdateRequest";

export async function getUserDetails(): Promise<UserResponse> {
    const res = await api.get<UserResponse>("/v1/user");
    return res.data;
}

export async function updateUserDetails(data: UserUpdateRequest): Promise<UserResponse> {
    const res = await api.patch<UserResponse>("/v1/user", data);
    return res.data;
}