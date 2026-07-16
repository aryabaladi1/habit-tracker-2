package com.habit.habit_tracker.dto.request

import jakarta.validation.constraints.Size
import jakarta.validation.constraints.NotBlank

data class RegisterRequest(
    @field:NotBlank(message = "Username is required")
    @field:Size(max = 20, message = "Username must be at most 20 characters")
    val username: String,

    @field:NotBlank(message = "Password is required")
    @field:Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
    val password: String
)