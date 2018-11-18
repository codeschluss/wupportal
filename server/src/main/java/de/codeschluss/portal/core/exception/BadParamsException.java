package de.codeschluss.portal.core.exception;

public class BadParamsException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public BadParamsException(String message) {
    super("Bad param: " + message);
  }
}
