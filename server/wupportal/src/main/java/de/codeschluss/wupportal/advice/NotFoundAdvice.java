package de.codeschluss.wupportal.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import de.codeschluss.wupportal.exception.NotFoundException;

@ControllerAdvice
public class NotFoundAdvice {
	
	@ResponseBody
	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	public String notFoundHandler(NotFoundException ex) {
		return ex.getMessage();
	}
}
