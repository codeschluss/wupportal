package de.codeschluss.portal.core.api.advice;

import de.codeschluss.portal.core.api.dto.ApiError;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * The Class NotFoundAdvice.
 * 
 * @author Valmir Etemi
 *
 */
@ControllerAdvice
public class NotFoundAdvice {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ApiError> notFoundHandler(NotFoundException ex) {
    HttpStatus status = HttpStatus.NOT_FOUND;
    return new ResponseEntity<ApiError>(new ApiError(status, "Not Found", ex.getMessage()), status);
  }
}
