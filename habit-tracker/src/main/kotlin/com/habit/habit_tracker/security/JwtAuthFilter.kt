package com.habit.habit_tracker.security

import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.JwtException
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException

@Component
class JwtAuthFilter(
    private val jwtService: JwtService,
    private val userDetailsService: UserDetailsService
) : OncePerRequestFilter() {

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {

        val authHeader = request.getHeader("Authorization")

        if (
            authHeader == null ||
            !authHeader.startsWith("Bearer ")
        ) {
            filterChain.doFilter(request, response)
            return
        }

        try {

            val jwt = authHeader.substringAfter("Bearer ")

            val username = jwtService.extractUsername(jwt)

            if (
                username != null &&
                SecurityContextHolder.getContext().authentication == null
            ) {

                val userDetails =
                    userDetailsService.loadUserByUsername(username)

                if (jwtService.isTokenValid(jwt, userDetails)) {

                    val authToken =
                        UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.authorities
                        )

                    authToken.details =
                        WebAuthenticationDetailsSource()
                            .buildDetails(request)

                    SecurityContextHolder
                        .getContext()
                        .authentication = authToken
                }
            }

            filterChain.doFilter(request, response)

        } catch (e: ExpiredJwtException) {

            response.status = HttpServletResponse.SC_UNAUTHORIZED

            response.contentType = "application/json"

            response.writer.write(
                """{"message":"JWT expired"}"""
            )

        } catch (e: JwtException) {

            response.status = HttpServletResponse.SC_UNAUTHORIZED

            response.contentType = "application/json"

            response.writer.write(
                """{"message":"Invalid JWT"}"""
            )
        }
    }
}