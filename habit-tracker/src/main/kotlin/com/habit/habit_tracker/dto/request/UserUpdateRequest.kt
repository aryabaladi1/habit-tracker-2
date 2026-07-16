package com.habit.habit_tracker.dto.request

data class UserUpdateRequest(
    val username: String? = null,
    val firstName: String? = null,
    val lastName: String? = null
)