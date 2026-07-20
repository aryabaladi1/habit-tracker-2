import { DailyHabitLogResponse } from "./DailyHabitLogResponse";
import { WeeklyHabitLogResponse } from "./WeeklyHabitLogResponse";
import { HabitResponse } from "./HabitResponse";

export interface FullHabitLogsForWeek {
  dailyHabitLogs: DailyHabitLogResponse[];
  weeklyHabitLog?: WeeklyHabitLogResponse | null;
  habit: HabitResponse;
}
