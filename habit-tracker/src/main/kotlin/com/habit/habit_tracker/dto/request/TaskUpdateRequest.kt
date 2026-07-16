package com.habit.habit_tracker.dto.request

import com.habit.habit_tracker.enums.TaskDifficulty
import com.habit.habit_tracker.enums.TaskStatus

import jakarta.validation.constraints.Size

data class TaskUpdateRequest(
    @field:Size(max = 50, message = "Task name cannot exceed 50 characters")
    val name: String?,

    @field:Size(max = 200, message = "Description cannot exceed 200 characters")
    val description: String?,

    val status: TaskStatus?,

    val difficulty: TaskDifficulty?
)