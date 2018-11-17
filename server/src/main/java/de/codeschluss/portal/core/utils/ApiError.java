package de.codeschluss.portal.core.utils;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ApiError {

	private int status;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
	private LocalDateTime timestamp;
	
	private String error;
	
	private String message;
	
	public ApiError(HttpStatus status, String error, String message) {
		this.status = status.value();
		this.error = message;
		this.message = message;
		this.timestamp = LocalDateTime.now();
	}
}
