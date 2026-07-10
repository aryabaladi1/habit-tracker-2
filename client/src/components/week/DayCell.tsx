import type { DailyHabitLogResponse } from "../../types/dto/logs/response/daily/DailyHabitLogResponse";

import "../../styles/weeks/DayCell.css";

interface DayCellProps {
  habitId: number;

  date: string;

  dailyLog?: DailyHabitLogResponse;

  dailyGoal?: number | null;

  onMinutesChange: (
    habitId: number,
    date: string,
    minutes: number
  ) => void;
}

export default function DayCell({
  habitId,
  date,
  dailyLog,
  dailyGoal,
  onMinutesChange,
}: DayCellProps) {

  const minutes = dailyLog?.minutesDone ?? 0;

  function getProgressClass() {

    if (!dailyGoal || dailyGoal <= 0) {
      return "";
    }

    const ratio = minutes / dailyGoal;

    if (ratio >= 1)
      return "goal-complete";

    if (ratio >= 0.75)
      return "goal-good";

    if (ratio >= 0.5)
      return "goal-medium";

    if (ratio > 0)
      return "goal-low";

    return "";
  }

  return (
    <td className={`day-cell ${getProgressClass()}`}>

      <input
        type="number"
        min={0}
        value={minutes === 0 ? "" : minutes}
        placeholder="0"
        onBlur={(e) =>
          onMinutesChange(
            habitId,
            date,
            Number(e.target.value)
          )
        }
      />

    </td>
  );
}