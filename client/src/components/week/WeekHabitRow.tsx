import type { FullHabitLogsForWeek } from "../../types/dto/response/FullHabitLogsForWeek";
import DayCell from "./DayCell";
import EditableNumberCell from "./EditableNumberCell";

import "../../styles/weeks/WeekHabitRow.css";
import { formatLocalDate } from "../../utils/date";
import { minutesToTime } from "../../utils/time";

interface WeekHabitRowProps {
  habitData: FullHabitLogsForWeek;

  dates: Date[];

  onDailyMinutesChange: (
    habitId: number,
    date: string,
    minutes: number
  ) => void;

  onWeeklyGoalChange: (
    habitId: number,
    goal: number
  ) => void;
}

export default function WeekHabitRow({
  habitData,
  dates,
  onDailyMinutesChange,
  onWeeklyGoalChange,
}: WeekHabitRowProps) {

  const weeklyLog = habitData.weeklyHabitLog;

  return (
    <tr className="week-habit-row">

      <td className="habit-name">
        {habitData.habit.name}
      </td>

      <td>

      <EditableNumberCell
          mode="time"
          value={weeklyLog?.weeklyGoal}
          onSave={(goal) =>
              onWeeklyGoalChange(
                  habitData.habit.id,
                  goal
              )
          }
      />

      </td>

      {dates.map((date) => {

        const dateString =
          formatLocalDate(date)

        const log =
          habitData.dailyHabitLogs.find(
            (d) => d.date === dateString
          );

        return (
          <DayCell
              key={dateString}
              habitId={habitData.habit.id}
              date={dateString}
              dailyLog={log}
              dailyGoal={weeklyLog?.dailyGoal}
              onMinutesChange={onDailyMinutesChange}
          />
        );

      })}

      <td className="total-cell">
        {minutesToTime(weeklyLog?.minutesDone ?? 0)}
      </td>

      <td
        className={
          (weeklyLog?.weeklyImbalance ?? 0) >= 0
            ? "positive"
            : "negative"
        }
      >
        {minutesToTime(weeklyLog?.weeklyImbalance ?? 0, { includeSign: true })}
      </td>

    </tr>
  );
}