package com.habit.habit_tracker.mapper

import com.habit.habit_tracker.domain.WeeklyHabitLog
import com.habit.habit_tracker.dto.response.UpdateWeeklyGoalResponse
import com.habit.habit_tracker.dto.response.UpdateWeeklyNotesResponse

object WeeklyHabitLogMapper {

    fun toUpdateWeeklyGoalResponse(
        log: WeeklyHabitLog
    ): UpdateWeeklyGoalResponse  {

        return UpdateWeeklyGoalResponse(
            id = log.id!!,
            habitId = log.habit.id!!,
            weeklyGoal = log.weeklyGoal,
            notes = log.notes,
            weekStart = log.weekStart,
            weekEnd = log.weekEnd
        )
    }

    fun toUpdateWeeklyNotesResponse(
        log: WeeklyHabitLog
    ): UpdateWeeklyNotesResponse  {

        return UpdateWeeklyNotesResponse(
            id = log.id!!,
            habitId = log.habit.id!!,
            notes = log.notes,
            weekStart = log.weekStart,
            weekEnd = log.weekEnd
        )
    }
}