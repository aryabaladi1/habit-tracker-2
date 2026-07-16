package com.habit.habit_tracker.controller

import com.habit.habit_tracker.dto.response.UserResponse
import com.habit.habit_tracker.dto.request.UserUpdateRequest
import com.habit.habit_tracker.mapper.UserMapper
import com.habit.habit_tracker.service.UserService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/user")
class UserController(private val userService: UserService) {

    @GetMapping
    fun getUserDetails(): ResponseEntity<UserResponse> {
        val user = userService.getUserDetails()
        val response = UserMapper.toUserDetailsResponse(user)
        return ResponseEntity.ok(response)
    }

    @PatchMapping
    fun updateUserDetails(@Valid @RequestBody request: UserUpdateRequest): ResponseEntity<UserResponse> {
        val updatedUser = userService.updateUserDetails(request)
        val response = UserMapper.toUserDetailsResponse(updatedUser)
        return ResponseEntity.ok(response)
    }
}
