import { TaskDifficulty } from "../../enums/TaskDifficulty";
import { TaskStatus } from "../../enums/TaskStatus";

export interface TaskUpdateRequest {
  name?: string | null;
  description?: string | null;
  status?: TaskStatus | null;
  difficulty?: TaskDifficulty | null;
}
