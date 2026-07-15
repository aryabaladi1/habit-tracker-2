package com.habit.habit_tracker.dto.logs.response.weekly

import java.time.LocalDate

data class WeeklyHabitLogSaveResponse (
    val id: Long,
    val habitId: Long,
    val weeklyGoal: Int?,
    val notes: String?,
    val weekStart: LocalDate,
    val weekEnd: LocalDate
)