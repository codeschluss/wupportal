package de.codeschluss.portal.core.api.advice;

import de.codeschluss.portal.core.api.dto.ApiError;
import de.codeschluss.portal.core.exception.BadParamsException;

import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * The Class InvalidApiAccessAdvice.
 * 
 * @author Valmir Etemi
 *
 */
@ControllerAdvice
public class InvalidApiAccessAdvice extends ResponseEntityExceptionHandler {

  @ExceptionHandler(InvalidDataAccessApiUsageException.class)
  public ResponseEntity<ApiError> invalidApiAccessHandler(InvalidDataAccessApiUsageException ex) {
    return handleResponse("Invalid API params");
  }

  @ExceptionHandler(value = {
      BadParamsException.class,
      PropertyReferenceException.class
  })
  public ResponseEntity<ApiError> badParamsAccessHandler(Exception ex) {
    return handleResponse(ex.getMessage());
  }

  private ResponseEntity<ApiError> handleResponse(String message) {
    HttpStatus status = HttpStatus.BAD_REQUEST;
    return new ResponseEntity<ApiError>(new ApiError(status, "Bad Request", message), status);
  }
}
