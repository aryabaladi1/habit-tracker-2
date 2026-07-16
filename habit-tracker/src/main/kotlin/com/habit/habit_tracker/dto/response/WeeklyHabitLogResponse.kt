package com.habit.habit_tracker.dto.response

import com.fasterxml.jackson.annotation.JsonInclude
import java.time.LocalDate

@JsonInclude(JsonInclude.Include.NON_NULL)
data class WeeklyHabitLogResponse(
    val id: Long,
    val habitId: Long,
    val weeklyGoal: Int?,
    val dailyGoal: Int?,
    val minutesDone: Int,
    val weeklyImbalance: Int?,
    val notes: String?,
    val weekStart: LocalDate,
    val weekEnd: LocalDate
)