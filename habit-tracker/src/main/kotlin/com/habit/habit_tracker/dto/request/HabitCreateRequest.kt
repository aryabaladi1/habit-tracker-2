package com.habit.habit_tracker.dto.request

import jakarta.validation.constraints.Size
import jakarta.validation.constraints.NotBlank

data class HabitCreateRequest(
    @field:NotBlank(message = "Habit name cannot be blank")
    @field:Size(max = 50, message = "Habit name should not exceed 50 characters")
    val name: String,

    @field:Size(max = 200, message = "Habit description should not exceed 200 characters")
    val description: String? = null
)