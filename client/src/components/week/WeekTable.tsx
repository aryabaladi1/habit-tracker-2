import type { FullHabitLogsForWeek } from "../../types/dto/logs/response/FullHabitLogsForWeek";
import WeekHabitRow from "./WeekHabitRow";

import "../../styles/weeks/WeekTable.css";

interface WeekTableProps {
  habits: FullHabitLogsForWeek[];

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

export default function WeekTable({
  habits,
  dates,
  onDailyMinutesChange,
  onWeeklyGoalChange,
}: WeekTableProps) {

  return (
    <div className="week-table-container">

      <table className="week-table">

        <thead>

          <tr>

            <th>Habit</th>

            <th>Goal</th>

            {dates.map((date) => (
              <th
                key={date.toISOString()}
                className="day-column"
              >
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </th>
            ))}

            <th>Total</th>

            <th>Imbalance</th>

          </tr>

        </thead>

        <tbody>

        {habits.map((habitData) => (

            <WeekHabitRow
            key={habitData.habit.id}
            habitData={habitData}
            dates={dates}
            onDailyMinutesChange={onDailyMinutesChange}
            onWeeklyGoalChange={onWeeklyGoalChange}
            />

        ))}

        </tbody>

      </table>

    </div>
  );
}