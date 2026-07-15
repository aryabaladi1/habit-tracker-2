package com.habit.habit_tracker.mapper

import com.habit.habit_tracker.domain.WeeklyHabitLog
import com.habit.habit_tracker.dto.logs.response.weekly.WeeklyHabitLogSaveResponse

object WeeklyHabitLogMapper {

    fun toWeeklyHabitLogSaveResponse(
        log: WeeklyHabitLog
    ): WeeklyHabitLogSaveResponse  {

        return WeeklyHabitLogSaveResponse(
            id = log.id!!,
            habitId = log.habit.id!!,
            weeklyGoal = log.weeklyGoal,
            notes = log.notes,
            weekStart = log.weekStart,
            weekEnd = log.weekEnd
        )
    }
}