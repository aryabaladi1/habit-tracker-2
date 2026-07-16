package com.habit.habit_tracker.dto.response

import com.fasterxml.jackson.annotation.JsonInclude
import com.habit.habit_tracker.dto.response.HabitResponse

@JsonInclude(JsonInclude.Include.NON_NULL)
data class FullHabitLogsForWeek(
    val dailyHabitLogs: List<DailyHabitLogResponse>,
    val weeklyHabitLog: WeeklyHabitLogResponse?,
    val habit: HabitResponse,
)