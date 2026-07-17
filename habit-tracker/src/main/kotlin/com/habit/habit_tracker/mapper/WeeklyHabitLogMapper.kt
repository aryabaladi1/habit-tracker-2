package com.habit.habit_tracker.mapper

import com.habit.habit_tracker.domain.WeeklyHabitLog
import com.habit.habit_tracker.dto.response.UpdateWeeklyGoalResponse

object WeeklyHabitLogMapper {

    fun toUpdateWeeklyGoalResponse(
        log: WeeklyHabitLog
    ): UpdateWeeklyGoalResponse  {

        return UpdateWeeklyGoalResponse(
            id = log.id!!,
            habitId = log.habit.id!!,
            weeklyGoal = log.weeklyGoal,
            weekStart = log.weekStart,
            weekEnd = log.weekEnd
        )
    }
}