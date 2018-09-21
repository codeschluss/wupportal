package de.codeschluss.wupportal.advice;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class InvalidApiAccessAdvice {

	@ResponseBody
	@ExceptionHandler(InvalidDataAccessApiUsageException.class)
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	String invalidApiAccessHandler(InvalidDataAccessApiUsageException ex) {
		//TODO: Error Objects with proper message
		return "Invalid API params";
	}
}
