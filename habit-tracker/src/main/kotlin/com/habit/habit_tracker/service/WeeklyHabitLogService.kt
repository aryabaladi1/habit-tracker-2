package com.habit.habit_tracker.service

import java.time.LocalDate
import java.time.temporal.TemporalAdjusters

import com.habit.habit_tracker.constants.ErrorMessage.HABIT_NOT_FOUND

import org.slf4j.Logger
import org.slf4j.LoggerFactory

import org.springframework.context.event.EventListener
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service

import com.habit.habit_tracker.domain.WeeklyHabitLog
import com.habit.habit_tracker.dto.logs.request.weekly.WeeklyHabitLogRequest
import com.habit.habit_tracker.events.DailyHabitLogUpdatedEvent
import com.habit.habit_tracker.exception.ApiRequestException
import com.habit.habit_tracker.repository.HabitRepository
import com.habit.habit_tracker.repository.WeeklyHabitLogRepository
import com.habit.habit_tracker.security.AuthUtil

@Service
class WeeklyHabitLogService(
    private val weeklyHabitLogRepository: WeeklyHabitLogRepository,
    private val habitRepository: HabitRepository,
    private val authUtil: AuthUtil
) {
    private val logger: Logger = LoggerFactory.getLogger(WeeklyHabitLogService::class.java)

    @EventListener
    fun handleDailyHabitLogUpdated(event: DailyHabitLogUpdatedEvent) {
        try {
            processHabitLog(event.habitId, event.minutesDoneChange, event.date)
        } catch (e: Exception) {
            logger.error("Error processing daily habit log update for habitId=${event.habitId}", e)
        }
    }

    fun processHabitLog(habitId: Long, minutesDoneChange: Int, date: LocalDate) {
        val weekStart: LocalDate = date.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY))
        val weekEnd: LocalDate = weekStart.plusDays(6)

        val habit = habitRepository.findById(habitId)
            .orElseThrow { ApiRequestException(HABIT_NOT_FOUND, HttpStatus.NOT_FOUND) }
        
        val weeklyLog = weeklyHabitLogRepository.findByHabitAndDate(habitId, weekStart, weekEnd)
            .orElseGet {
                WeeklyHabitLog(
                    habit = habit,
                    weekStart = weekStart,
                    weekEnd = weekEnd
                )
            }
            

        weeklyLog.minutesDone += minutesDoneChange

        weeklyHabitLogRepository.save(weeklyLog)
    }

    fun saveWeeklyHabitLog(habitId: Long, request: WeeklyHabitLogRequest): WeeklyHabitLog {
        val user = authUtil.getAuthenticatedUser()
        val habit = habitRepository.findByIdAndUserId(habitId, user.id!!)
            .orElseThrow { ApiRequestException(HABIT_NOT_FOUND, HttpStatus.NOT_FOUND) }

        val weeklyLog = weeklyHabitLogRepository.findByHabitAndDate(habitId, request.weekStart, request.weekEnd)
            .orElseGet {
                WeeklyHabitLog(
                    habit = habit,
                    weekStart = request.weekStart,
                    weekEnd = request.weekEnd
                )
            }
        
        request.weeklyGoal?.let {
            weeklyLog.weeklyGoal = it
            weeklyLog.dailyGoal = it.floorDiv(7)
            weeklyLog.weeklyImbalance = weeklyLog.minutesDone - it
        }

        return weeklyHabitLogRepository.save(weeklyLog)
    }
}