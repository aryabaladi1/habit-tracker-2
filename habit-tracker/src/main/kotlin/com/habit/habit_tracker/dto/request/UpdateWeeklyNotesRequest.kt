package com.habit.habit_tracker.dto.request

import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.time.LocalDate

data class UpdateWeeklyNotesRequest(
    @field:Size(max = 200)
    val notes: String? = null,

    @field:NotNull(message = "Start of the week is required")
    val weekStart: LocalDate,

    @field:NotNull(message = "End of the week is required")
    val weekEnd: LocalDate
)