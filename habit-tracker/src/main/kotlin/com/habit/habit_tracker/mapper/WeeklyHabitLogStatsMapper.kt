package com.habit.habit_tracker.mapper

import com.habit.habit_tracker.domain.WeeklyHabitLog
import com.habit.habit_tracker.dto.logs.response.weekly.WeeklyHabitLogResponse

object WeeklyHabitLogStatsMapper {

    fun toWeeklyHabitLogResponse(
        log: WeeklyHabitLog?,
        minutesDone: Int
    ): WeeklyHabitLogResponse? {

        return log?.let {

            WeeklyHabitLogResponse(
                id = it.id!!,
                habitId = it.habit.id!!,

                weeklyGoal = it.weeklyGoal,

                dailyGoal = it.weeklyGoal?.div(7),

                minutesDone = minutesDone,

                weeklyImbalance =
                    it.weeklyGoal?.let { goal ->
                        minutesDone - goal
                    },

                notes = it.notes,

                weekStart = it.weekStart,
                weekEnd = it.weekEnd
            )
        }
    }
}