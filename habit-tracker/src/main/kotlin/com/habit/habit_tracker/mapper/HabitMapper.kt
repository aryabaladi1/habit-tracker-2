package com.habit.habit_tracker.mapper

import com.habit.habit_tracker.domain.Habit
import com.habit.habit_tracker.dto.response.HabitResponse

object HabitMapper {
    fun toHabitResponse(habit: Habit): HabitResponse {
        return HabitResponse(
            id = habit.id!!,
            userId = habit.user.id!!,
            name = habit.name,
            description = habit.description,
            minutesTotal = habit.minutesTotal,
            createdAt = habit.createdAt!!
        )
    }
}