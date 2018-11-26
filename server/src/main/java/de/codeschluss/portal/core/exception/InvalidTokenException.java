package de.codeschluss.portal.core.exception;

/**
 * The Class InvalidTokenException.
 * 
 * @author Valmir Etemi
 *
 */
public class InvalidTokenException extends Exception {

  private static final long serialVersionUID = 1L;
  
  public InvalidTokenException(String message) {
    super(message);
  }
}
