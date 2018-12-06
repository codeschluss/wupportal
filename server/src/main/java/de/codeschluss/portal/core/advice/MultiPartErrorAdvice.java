package de.codeschluss.portal.core.advice;

import de.codeschluss.portal.core.utils.ApiError;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MultipartException;

/**
 * The Class MultiPartErrorAdvice.
 * 
 * @author Valmir Etemi
 *
 */
@ControllerAdvice
public class MultiPartErrorAdvice {
  

  /**
   * File size limit exceeded handler.
   *
   * @param ex the ex
   * @return the response entity
   */
  @ExceptionHandler(MultipartException.class)
  public ResponseEntity<ApiError> fileSizeLimitExceededHandler(MultipartException ex) {
    HttpStatus status = HttpStatus.PAYLOAD_TOO_LARGE;
    return new ResponseEntity<ApiError>(
        new ApiError(status, "Payload Too Large", ex.getMessage()), status);
  }
}
