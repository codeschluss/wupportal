package de.codeschluss.portal.core.advice;

import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.core.utils.ApiError;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * The Class DuplicateEntryAdvice.
 * 
 * @author Valmir Etemi
 *
 */
@ControllerAdvice
public class DuplicateEntryAdvice extends ResponseEntityExceptionHandler {

  @ExceptionHandler(DuplicateEntryException.class)
  public void invalidApiAccessHandler(DuplicateEntryException ex) {
    HttpStatus status = HttpStatus.CONFLICT;
    new ResponseEntity<ApiError>(new ApiError(status, "Conflict", ex.getMessage()), status);
  }
}
