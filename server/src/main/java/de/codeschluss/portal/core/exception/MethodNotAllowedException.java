package de.codeschluss.portal.core.exception;

/**
 * The Class MethodNotAllowedException.
 * 
 * @author Valmir Etemi
 *
 */
public class MethodNotAllowedException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public MethodNotAllowedException(String message) {
    super(message);
  }
}
