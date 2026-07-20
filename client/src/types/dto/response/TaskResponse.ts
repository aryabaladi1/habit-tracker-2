import { TaskDifficulty } from "../../enums/TaskDifficulty";
import { TaskStatus } from "../../enums/TaskStatus";

export interface TaskResponse {
  id: number;
  userId: number;
  name: string;
  description?: string | null;
  status: TaskStatus;
  difficulty: TaskDifficulty;
  dueDate: string;
  createdAt: string;
}
