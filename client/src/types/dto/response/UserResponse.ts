export interface UserResponse {
    id: number;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    lastLogin: string;
    createdAt: string;
}