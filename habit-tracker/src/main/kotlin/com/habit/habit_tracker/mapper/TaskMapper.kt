package com.habit.habit_tracker.mapper

import com.habit.habit_tracker.domain.Task
import com.habit.habit_tracker.dto.response.TaskResponse

object TaskMapper {
    fun toTaskResponse(task: Task): TaskResponse {
        return TaskResponse(
            id = task.id!!,
            userId = task.user.id!!,
            name = task.name,
            description = task.description,
            status = task.status,
            difficulty = task.difficulty,
            dueDate = task.dueDate,
            createdAt = task.createdAt!!
        )
    }
}
