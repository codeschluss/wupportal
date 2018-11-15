package de.codeschluss.portal.common.advice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import de.codeschluss.portal.common.exception.DuplicateEntryException;

@ControllerAdvice
public class DuplicateEntryAdvice {

	@ResponseBody
	@ExceptionHandler(DuplicateEntryException.class)
	@ResponseStatus(code = HttpStatus.CONFLICT)
	public String invalidApiAccessHandler(DuplicateEntryException ex) {
		return ex.getMessage();
	}
}
