package com.habit.habit_tracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*

import com.habit.habit_tracker.dto.request.HabitCreateRequest;
import com.habit.habit_tracker.dto.response.HabitResponse;
import com.habit.habit_tracker.dto.request.HabitUpdateRequest;
import com.habit.habit_tracker.service.HabitService;
import com.habit.habit_tracker.mapper.HabitMapper

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/habits")
class HabitController(private val habitService: HabitService) {
    @PostMapping
    fun createHabit(@Valid @RequestBody request: HabitCreateRequest): ResponseEntity<HabitResponse> {
        val habit = habitService.createHabit(request)
        val response = HabitMapper.toHabitResponse(habit)
        return ResponseEntity.ok(response)
    }

    @PatchMapping("/{habitId}")
    fun updateHabit(
        @PathVariable habitId: Long, 
        @Valid @RequestBody request: HabitUpdateRequest
    ): ResponseEntity<HabitResponse> {
        val habit = habitService.updateHabit(habitId, request)
        val response = HabitMapper.toHabitResponse(habit)
        return ResponseEntity.ok(response)
    }

    @GetMapping("/{habitId}")
    fun getHabit(@PathVariable habitId: Long): ResponseEntity<HabitResponse> {
        val habit = habitService.getHabit(habitId)
        val response = HabitMapper.toHabitResponse(habit)
        return ResponseEntity.ok(response)
    }

    @GetMapping
    fun getAllHabits(): ResponseEntity<List<HabitResponse>> {
        val habits = habitService.getAllHabits()
        val response = habits.map { HabitMapper.toHabitResponse(it)}
        return ResponseEntity.ok(response)
    }
}