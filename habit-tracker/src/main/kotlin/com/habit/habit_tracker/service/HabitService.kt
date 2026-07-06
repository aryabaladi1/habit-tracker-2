package com.habit.habit_tracker.service

import org.springframework.context.event.EventListener

import com.habit.habit_tracker.constants.ErrorMessage.USER_NOT_FOUND
import com.habit.habit_tracker.constants.ErrorMessage.HABIT_NOT_FOUND
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service

import com.habit.habit_tracker.domain.Habit
import com.habit.habit_tracker.dto.habit.request.HabitCreateRequest
import com.habit.habit_tracker.dto.habit.request.HabitUpdateRequest
import com.habit.habit_tracker.exception.ApiRequestException
import com.habit.habit_tracker.events.DailyHabitLogUpdatedEvent
import com.habit.habit_tracker.repository.HabitRepository
import com.habit.habit_tracker.repository.UserRepository
import com.habit.habit_tracker.security.AuthUtil

import jakarta.transaction.Transactional

@Service
class HabitService(
    private val habitRepository: HabitRepository,
    private val userRepository: UserRepository,
    private val authUtil: AuthUtil
) {
    fun createHabit(request: HabitCreateRequest): Habit {
        val user = authUtil.getAuthenticatedUser()
            .let { userRepository.findById(it.id!!).orElseThrow {
                ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
            } } // This is necessary for now, due to detached entity issues :<

        return habitRepository.save(
            Habit(
                user = user,
                name = request.name,
                description = request.description
            )
        )
    }

    fun updateHabit(habitId: Long, request: HabitUpdateRequest): Habit {
        val user = authUtil.getAuthenticatedUser()
        val habit = habitRepository.findByIdAndUserId(habitId, user.id!!)
            .orElseThrow { ApiRequestException(HABIT_NOT_FOUND, HttpStatus.NOT_FOUND)}

        var updated = false

        habit.apply {
            request.name?.takeIf { it.isNotBlank() }?.let { 
                name = it
                updated = true
            }
            request.description?.takeIf {it.isNotBlank()}?.let { 
                description = it 
                updated = true
            }
        }

        return if (updated) habitRepository.save(habit) else habit
    }

    fun getHabit(habitId: Long): Habit {
        val user = authUtil.getAuthenticatedUser()
        return habitRepository.findByIdAndUserId(habitId, user.id!!)
            .orElseThrow { ApiRequestException(HABIT_NOT_FOUND, HttpStatus.NOT_FOUND)}
    }

    fun getAllHabits(): List<Habit> {
        val user = authUtil.getAuthenticatedUser()
        return habitRepository.findAllByUserId(user.id!!)
    }
}