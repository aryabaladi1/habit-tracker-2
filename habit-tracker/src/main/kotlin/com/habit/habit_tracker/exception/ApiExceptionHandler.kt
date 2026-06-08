package com.habit.habit_tracker.exception

import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class ApiExceptionHandler {

    @ExceptionHandler(ApiRequestException::class)
    fun handleApiRequestException(exception: ApiRequestException): ResponseEntity<Map<String, String>> {
        val body = mapOf("message" to (exception.message ?: "Error"))
        return ResponseEntity.status(exception.status).body(body)
    }

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(ex: MethodArgumentNotValidException): ResponseEntity<Map<String, String>> {
        val errors = ex.bindingResult.fieldErrors.associate { it.field to (it.defaultMessage ?: "Invalid") }
        return ResponseEntity.badRequest().body(errors)
    }

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleHttpMessageNotReadable(
        ex: HttpMessageNotReadableException
    ): ResponseEntity<Map<String, String>> {

        return ResponseEntity.badRequest().body(
            mapOf(
                "message" to "Invalid request data."
            )
        )
    }
}