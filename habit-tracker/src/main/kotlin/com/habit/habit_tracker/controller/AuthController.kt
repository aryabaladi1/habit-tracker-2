package com.habit.habit_tracker.controller

import com.habit.habit_tracker.dto.response.AuthResponse
import com.habit.habit_tracker.dto.request.LoginRequest
import com.habit.habit_tracker.dto.request.RegisterRequest
import com.habit.habit_tracker.mapper.AuthMapper
import com.habit.habit_tracker.service.AuthService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/auth")
class AuthController(private val authService: AuthService) {
    @PostMapping("/register")
    fun registerUser(@Valid @RequestBody request: RegisterRequest): ResponseEntity<AuthResponse> {
        val authResult = authService.registerUser(request)
        val response = AuthMapper.toAuthResponse(authResult)
        return ResponseEntity.ok(response)
    }

    @PostMapping("/login")
    fun loginUser(@Valid @RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        val authResult = authService.loginUser(request)
        val response = AuthMapper.toAuthResponse(authResult)
        return ResponseEntity.ok(response)
    }
}