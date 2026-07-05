package com.habit.habit_tracker.exception

data class ApiErrorResponse(
    val message: String,
    val errors: Map<String, String>? = emptyMap()
)
