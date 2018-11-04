package de.codeschluss.portal.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import de.codeschluss.portal.exception.DuplicateEntryException;

@ControllerAdvice
public class DuplicateEntryAdvice {

	@ResponseBody
	@ExceptionHandler(DuplicateEntryException.class)
	@ResponseStatus(code = HttpStatus.CONFLICT)
	public String invalidApiAccessHandler(DuplicateEntryException ex) {
		//TODO: Error Objects with proper message
		return ex.getMessage();
	}
}
