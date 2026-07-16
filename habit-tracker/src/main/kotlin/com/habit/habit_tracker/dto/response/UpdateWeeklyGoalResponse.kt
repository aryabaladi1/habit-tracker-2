package com.habit.habit_tracker.dto.response

import java.time.LocalDate

data class UpdateWeeklyGoalResponse (
    val id: Long,
    val habitId: Long,
    val weeklyGoal: Int?,
    val notes: String?,
    val weekStart: LocalDate,
    val weekEnd: LocalDate
)