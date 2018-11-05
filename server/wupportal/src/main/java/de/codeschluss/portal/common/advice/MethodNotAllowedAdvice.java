package de.codeschluss.portal.common.advice;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import de.codeschluss.portal.common.exception.DuplicateEntryException;

@ControllerAdvice
public class MethodNotAllowedAdvice {

	@ResponseBody
	@ExceptionHandler(DuplicateEntryException.class)
	@ResponseStatus(code = HttpStatus.METHOD_NOT_ALLOWED)
	public String methodNotAllowedHandler(InvalidDataAccessApiUsageException ex) {
		//TODO: Error Objects with proper message
		return ex.getMessage();
	}
}
