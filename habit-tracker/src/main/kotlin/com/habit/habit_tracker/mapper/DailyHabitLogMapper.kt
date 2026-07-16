package com.habit.habit_tracker.mapper

import com.habit.habit_tracker.domain.DailyHabitLog
import com.habit.habit_tracker.dto.response.DailyHabitLogResponse

object DailyHabitLogMapper {
    fun toDailyHabitLogResponse(log: DailyHabitLog): DailyHabitLogResponse {
        return DailyHabitLogResponse(
            habitId = log.habit.id!!,
            minutesDone = log.minutesDone,
            notes = log.notes,
            date = log.date
        )
    }
}
