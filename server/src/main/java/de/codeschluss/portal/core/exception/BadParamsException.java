package de.codeschluss.portal.core.exception;

/**
 * The Class BadParamsException.
 * 
 * @author Valmir Etemi
 *
 */
public class BadParamsException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public BadParamsException(String message) {
    super("Bad param: " + message);
  }
}
