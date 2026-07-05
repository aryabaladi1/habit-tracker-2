package com.habit.habit_tracker.exception

import com.fasterxml.jackson.databind.exc.InvalidFormatException
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class ApiExceptionHandler {

    @ExceptionHandler(ApiRequestException::class)
    fun handleApiRequestException(
        ex: ApiRequestException
    ): ResponseEntity<ApiErrorResponse> {

        return ResponseEntity
            .status(ex.status)
            .body(
                ApiErrorResponse(
                    message = ex.message ?: "An error occurred."
                )
            )
    }

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(
        ex: MethodArgumentNotValidException
    ): ResponseEntity<ApiErrorResponse> {

        val errors = ex.bindingResult.fieldErrors.associate {
            it.field to (it.defaultMessage ?: "Invalid value")
        }

        return ResponseEntity.badRequest().body(
            ApiErrorResponse(
                message = "Validation failed.",
                errors = errors
            )
        )
    }

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleHttpMessageNotReadable(
        ex: HttpMessageNotReadableException
    ): ResponseEntity<ApiErrorResponse> {

        return ResponseEntity.badRequest().body(
            ApiErrorResponse(
                message = "Invalid request data."
            )
        )
    }

    @ExceptionHandler(Exception::class)
    fun handleUnexpectedException(
        ex: Exception
    ): ResponseEntity<ApiErrorResponse> {

        ex.printStackTrace()

        return ResponseEntity.internalServerError().body(
            ApiErrorResponse(
                message = "An unexpected error occurred."
            )
        )
    }
}