package com.habit.habit_tracker.controller

import com.habit.habit_tracker.dto.logs.request.daily.DailyHabitLogRequest
import com.habit.habit_tracker.dto.logs.response.daily.DailyHabitLogResponse
import com.habit.habit_tracker.dto.logs.request.weekly.WeeklyHabitLogRequest
import com.habit.habit_tracker.dto.logs.response.weekly.WeeklyHabitLogResponse
import com.habit.habit_tracker.dto.logs.response.FullHabitLogsForWeek
import com.habit.habit_tracker.mapper.DailyHabitLogMapper
import com.habit.habit_tracker.mapper.WeeklyHabitLogMapper
import com.habit.habit_tracker.mapper.FullHabitLogsForWeekMapper
import com.habit.habit_tracker.exception.ApiRequestException
import com.habit.habit_tracker.service.DailyHabitLogService
import com.habit.habit_tracker.service.WeeklyHabitLogService
import com.habit.habit_tracker.service.HabitService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate
import java.time.format.DateTimeParseException

@RestController
@RequestMapping("api/v1/logs")
class HabitLogController(
    private val dailyHabitLogService: DailyHabitLogService,
    private val weeklyHabitLogService: WeeklyHabitLogService,
    private val habitService: HabitService
) {

    @PutMapping("/daily/{habitId}")
    fun saveDailyHabitLog(
        @PathVariable habitId: Long, 
        @Valid @RequestBody request: DailyHabitLogRequest
        ): ResponseEntity<DailyHabitLogResponse> {
        val dailyHabitLog = dailyHabitLogService.saveDailyHabitLog(habitId, request)
        val response = DailyHabitLogMapper.toDailyHabitLogResponse(dailyHabitLog)
        return ResponseEntity.ok(response)
    }

    @PutMapping("/weekly/{habitId}")
    fun saveWeeklyHabitLog(
        @PathVariable habitId: Long, 
        @Valid @RequestBody request: WeeklyHabitLogRequest
        ): ResponseEntity<WeeklyHabitLogResponse> {
        val weeklyHabitLog = weeklyHabitLogService.saveWeeklyHabitLog(habitId, request)
        val response = WeeklyHabitLogMapper.toWeeklyHabitLogResponse(weeklyHabitLog)
        return ResponseEntity.ok(response)
    }

    @GetMapping("/daily")
    fun getDailyHabitLog(
        @RequestParam("habitId") habitId: Long,
        @RequestParam("date") dateString: String
    ): ResponseEntity<DailyHabitLogResponse> {
        return try {
            val date = LocalDate.parse(dateString)
            val dailyHabitLog = dailyHabitLogService.getDailyHabitLog(habitId, date)
            val response = DailyHabitLogMapper.toDailyHabitLogResponse(dailyHabitLog)
            ResponseEntity.ok(response)
        } catch (e: DateTimeParseException) {
            throw ApiRequestException("Invalid date format. Please use YYYY-MM-DD.", HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/week")
    fun getFullHabitLogsForWeek(
        @RequestParam("habitId") habitId: Long,
        @RequestParam("weekStart") weekStartString: String,
        @RequestParam("weekEnd") weekEndString: String
    ): ResponseEntity<FullHabitLogsForWeek> {
        return try {
            val weekStart = LocalDate.parse(weekStartString)
            val weekEnd = LocalDate.parse(weekEndString)

            val dailyHabitLogs = dailyHabitLogService.getDailyHabitLogsForWeek(habitId, weekStart, weekEnd)
            val weeklyHabitLog = weeklyHabitLogService.getWeeklyHabitLog(habitId, weekStart, weekEnd)
            val habit = habitService.getHabit(habitId)

            val fullHabitLogsForWeek = FullHabitLogsForWeekMapper.toFullHabitLogsForWeek(
                dailyHabitLogs, 
                weeklyHabitLog, 
                habit
            )

            ResponseEntity.ok(fullHabitLogsForWeek)

        } catch (e: DateTimeParseException) {
            throw ApiRequestException("Invalid date format. Please use YYYY-MM-DD.", HttpStatus.BAD_REQUEST)
        }
    }
}
