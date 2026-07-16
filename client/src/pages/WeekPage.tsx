import { useEffect, useState } from "react";

import WeekHeader from "../components/week/WeekHeader";
import WeekTable from "../components/week/WeekTable";

import {
  getFullHabitLogsForWeek,
  saveDailyHabitLog,
  saveWeeklyHabitLog,
} from "../api/habitLogService";

import type { FullHabitLogsForWeek } from "../types/dto/response/FullHabitLogsForWeek";

import "../styles/weeks/WeekPage.css";
import { formatLocalDate, getMonday, getWeekDates, getWeekNumber } from "../utils/date";

export default function WeekPage() {
  const [weekData, setWeekData] = useState<FullHabitLogsForWeek[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [currentMonday, setCurrentMonday] = useState(getMonday(new Date()));

  const dates = getWeekDates(currentMonday);

  const weekStart = formatLocalDate(dates[0]);
  const weekEnd = formatLocalDate(dates[6]);

  async function loadWeek(initial = false) {
    try {
      if (initial)
        setLoadingInitial(true);
      else
        setRefreshing(true);

      const data = await getFullHabitLogsForWeek(
        weekStart,
        weekEnd
      );
      
      setWeekData(data);

      setWeekData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load week.");
    } finally {
      setLoadingInitial(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadWeek(true);
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
        weeklyGoal: goal,
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

  if (loadingInitial) {
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