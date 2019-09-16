package de.codeschluss.portal.core.api.advice;

import de.codeschluss.portal.core.api.dto.ApiError;

import javax.naming.ServiceUnavailableException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.reactive.function.client.WebClientException;

/**
 * The Class ServiceUnavailableAdvice.
 * 
 * @author Valmir Etemi
 *
 */
@ControllerAdvice
public class ServiceUnavailableAdvice {
  
  /**
   * Not available handler.
   *
   * @param ex the ex
   * @return the response entity
   */
  @ExceptionHandler(value = {
      WebClientException.class,
      ServiceUnavailableException.class
  })
  public ResponseEntity<ApiError> notAvailableHandler(Exception ex) {
    HttpStatus status = HttpStatus.SERVICE_UNAVAILABLE;
    return new ResponseEntity<ApiError>(
        new ApiError(status, "Unavailable", ex.getMessage()), status);
  }
}
