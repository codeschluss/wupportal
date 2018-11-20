package de.codeschluss.portal.core.advice;

import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.InvalidClaimException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;

import de.codeschluss.portal.core.exception.InvalidTokenException;
import de.codeschluss.portal.core.utils.ApiError;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class InvalidTokenAdvice {

  /**
   * Invalid token handler.
   *
   * @param ex the ex
   * @return the response entity
   */
  @ExceptionHandler(value = {
      AlgorithmMismatchException.class,
      InvalidClaimException.class,
      JWTVerificationException.class,
      InvalidTokenException.class,
      SignatureVerificationException.class,
      JWTDecodeException.class
  })
  public ResponseEntity<ApiError> invalidTokenHandler(SignatureVerificationException ex) {
    HttpStatus status = HttpStatus.FORBIDDEN;
    return new ResponseEntity<ApiError>(
        new ApiError(status, "Forbidden", ex.getMessage()), status);
  }
}
