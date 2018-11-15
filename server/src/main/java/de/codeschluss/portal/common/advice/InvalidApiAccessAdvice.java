package de.codeschluss.portal.common.advice;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import de.codeschluss.portal.common.exception.BadParamsException;
import de.codeschluss.portal.common.utils.ApiError;

@ControllerAdvice
public class InvalidApiAccessAdvice extends ResponseEntityExceptionHandler {

	@ExceptionHandler(InvalidDataAccessApiUsageException.class)
	public ResponseEntity<ApiError> invalidApiAccessHandler(InvalidDataAccessApiUsageException ex) {
		return handleResponse("Invalid API params");
	}

	@ExceptionHandler(BadParamsException.class)
	public ResponseEntity<ApiError> badParamsAccessHandler(BadParamsException ex) {
		return handleResponse(ex.getMessage());
	}
	
	private ResponseEntity<ApiError> handleResponse(String message) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		return new ResponseEntity<ApiError>(new ApiError(status, "Bad Request", message), status);
	}
}
