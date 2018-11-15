package de.codeschluss.portal.common.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.common.utils.ApiError;

@ControllerAdvice
public class NotFoundAdvice {
	
	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ApiError> notFoundHandler(NotFoundException ex) {
		HttpStatus status = HttpStatus.NOT_FOUND;
        return new ResponseEntity<ApiError>(new ApiError(status, "Not Found", ex.getMessage()), status);
	}
}
