package de.codeschluss.portal.common.utils;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ApiError {

	private LocalDateTime timestamp;

	private int status;
	
	private String error;
	
	private String message;
	
	public ApiError(HttpStatus status, String error, String message) {
		this.status = status.value();
		this.error = error;
		this.message = message;
		this.timestamp = LocalDateTime.now();
	}
}
