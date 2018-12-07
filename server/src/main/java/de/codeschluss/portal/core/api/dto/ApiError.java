package de.codeschluss.portal.core.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

import lombok.Data;

import org.springframework.http.HttpStatus;

// TODO: Auto-generated Javadoc
/**
 * The Class ApiError.
 * 
 * @author Valmir Etemi
 *
 */
@Data
public class ApiError {

  /** The status. */
  private int status;

  /** The timestamp. */
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
  private LocalDateTime timestamp;

  /** The error. */
  private String error;

  /** The message. */
  private String message;

  /**
   * Instantiates a new api error.
   *
   * @param status the status
   * @param error the error
   * @param message the message
   */
  public ApiError(HttpStatus status, String error, String message) {
    this.status = status.value();
    this.error = error;
    this.message = message;
    this.timestamp = LocalDateTime.now();
  }
}
