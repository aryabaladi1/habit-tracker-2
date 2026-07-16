package com.habit.habit_tracker.dto.response

import com.fasterxml.jackson.annotation.JsonInclude
import java.time.LocalDateTime

@JsonInclude(JsonInclude.Include.NON_NULL)
data class HabitResponse(
    val id: Long,
    val userId: Long,
    val name: String,
    val description: String?,
    val minutesTotal: Int,
    val createdAt: LocalDateTime
)