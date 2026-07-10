import { useEffect, useState } from "react";

import WeekHeader from "../components/week/WeekHeader";
import WeekTable from "../components/week/WeekTable";

import { getAllHabits } from "../api/habitService";
import {
  getFullHabitLogsForWeek,
  saveDailyHabitLog,
  saveWeeklyHabitLog,
} from "../api/habitLogService";

import type { HabitResponse } from "../types/dto/habit/response/HabitResponse";
import type { FullHabitLogsForWeek } from "../types/dto/logs/response/FullHabitLogsForWeek";

import "../styles/weeks/WeekPage.css";

export default function WeekPage() {
  const [weekData, setWeekData] = useState<FullHabitLogsForWeek[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentMonday, setCurrentMonday] = useState(getMonday(new Date()));

  function getMonday(date: Date) {
    const d = new Date(date);

    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);

    return d;
  }

  function getWeekDates(start: Date) {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }

  const dates = getWeekDates(currentMonday);

  const weekStart = dates[0].toISOString().split("T")[0];
  const weekEnd = dates[6].toISOString().split("T")[0];

  async function loadWeek() {
    try {
      setLoading(true);

      const habits: HabitResponse[] = await getAllHabits();

      const data = await Promise.all(
        habits.map((habit) =>
          getFullHabitLogsForWeek(
            habit.id,
            weekStart,
            weekEnd
          )
        )
      );

      setWeekData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load week.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeek();
  }, [weekStart]);

  async function handleDailyMinutesChange(
    habitId: number,
    date: string,
    minutes: number
  ) {
    try {
      await saveDailyHabitLog(habitId, {
        date,
        minutesDone: minutes,
      });

      loadWeek();
    } catch (err) {
      console.error(err);
      setError("Failed to save daily log.");
    }
  }

  async function handleWeeklyGoalChange(
    habitId: number,
    goal: number
  ) {
    try {
      await saveWeeklyHabitLog(habitId, {
        weekStart,
        weekEnd,
        minutesDone: null,
        notes: null,
      });

      loadWeek();
    } catch (err) {
      console.error(err);
      setError("Failed to save weekly goal.");
    }
  }

  function previousWeek() {
    const d = new Date(currentMonday);
    d.setDate(d.getDate() - 7);
    setCurrentMonday(d);
  }

  function nextWeek() {
    const d = new Date(currentMonday);
    d.setDate(d.getDate() + 7);
    setCurrentMonday(d);
  }

  function getWeekNumber(date: Date) {
    const target = new Date(date.valueOf());

    const firstThursday = new Date(target.getFullYear(), 0, 4);

    const diff =
      target.getTime() - getMonday(firstThursday).getTime();

    return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
  }

  if (loading) {
    return (
        <div className="loading-page">
            Loading...
        </div>
    );
}

  return (
    <div className="week-page">

      <WeekHeader
        weekNumber={getWeekNumber(currentMonday)}
        startDate={dates[0]}
        endDate={dates[6]}
        onPreviousWeek={previousWeek}
        onNextWeek={nextWeek}
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <WeekTable
        habits={weekData}
        dates={dates}
        onDailyMinutesChange={handleDailyMinutesChange}
        onWeeklyGoalChange={handleWeeklyGoalChange}
      />

    </div>
  );
}