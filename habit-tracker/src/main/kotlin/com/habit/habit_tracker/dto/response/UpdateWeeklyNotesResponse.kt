package com.habit.habit_tracker.dto.response

import java.time.LocalDate

data class UpdateWeeklyNotesResponse(
    val id: Long,
    val habitId: Long,
    val notes: String?,
    val weekStart: LocalDate,
    val weekEnd: LocalDate,
)