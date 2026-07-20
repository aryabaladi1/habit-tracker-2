import { useEffect, useState } from "react";

import WeekHeader from "../components/week/WeekHeader";
import WeekTable from "../components/week/WeekTable";
import WeekTableSkeleton from "../components/week/WeekTableSkeleton";
import {
  getFullHabitLogsForWeek,
  saveDailyHabitLog,
  updateWeeklyGoal,
} from "../api/habitLogService";
import type { FullHabitLogsForWeek } from "../types/dto/response/FullHabitLogsForWeek";
import "../styles/weeks/WeekPage.css";
import {
  formatLocalDate,
  getMonday,
  getWeekDates,
  getISOWeek,
  getMondayOfISOWeek,
  getISOYear,
} from "../utils/date";

export default function WeekPage() {
  const [weekData, setWeekData] = useState<FullHabitLogsForWeek[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [showWeekSelector, setShowWeekSelector] = useState(false);
  const [currentMonday, setCurrentMonday] = useState(getMonday(new Date()));

  const currentDate = new Date();

  const dates = getWeekDates(currentMonday);

  const weekStart = formatLocalDate(dates[0]);
  const weekEnd = formatLocalDate(dates[6]);

  async function loadWeek(initial = false) {
    try {
      if (initial) setLoadingInitial(true);
      else setRefreshing(true);

      const data = await getFullHabitLogsForWeek(weekStart, weekEnd);

      setWeekData(data);
    } catch (err) {
      console.error(err);
      showError("Failed to load week.");
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
      showError("Failed to save log.");
    }
  }

  async function handleupdateWeeklyGoal(habitId: number, goal: number) {
    try {
      await updateWeeklyGoal(habitId, {
        weekStart,
        weekEnd,
        weeklyGoal: goal,
      });

      loadWeek();
    } catch (err) {
      console.error(err);
      showError("Failed to set weekly goal.");
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

  function showError(message: string) {
    setError(message);

    setTimeout(() => {
      setError("");
    }, 4000);
  }

  {
    loadingInitial ? (
      <WeekTableSkeleton />
    ) : (
      <WeekTable
        habits={weekData}
        dates={dates}
        onDailyMinutesChange={handleDailyMinutesChange}
        onWeeklyGoalChange={handleupdateWeeklyGoal}
      />
    );
  }

  return (
    <div className="week-page">
      {error && <div className="error-toast">{error}</div>}

      <WeekHeader
        weekNumber={getISOWeek(currentMonday)}
        startDate={dates[0]}
        endDate={dates[6]}
        currentYear={getISOYear(currentDate)}
        currentWeek={getISOWeek(currentDate)}
        displayedYear={getISOYear(currentMonday)}
        displayedWeek={getISOWeek(currentMonday)}
        showWeekSelector={showWeekSelector}
        onOpenWeekSelector={() => setShowWeekSelector(true)}
        onCloseWeekSelector={() => setShowWeekSelector(false)}
        onPreviousWeek={previousWeek}
        onNextWeek={nextWeek}
        onWeekSelected={(year, week) => {
          setCurrentMonday(getMondayOfISOWeek(year, week));

          setShowWeekSelector(false);
        }}
      />

      <WeekTable
        habits={weekData}
        dates={dates}
        onDailyMinutesChange={handleDailyMinutesChange}
        onWeeklyGoalChange={handleupdateWeeklyGoal}
      />
    </div>
  );
}
