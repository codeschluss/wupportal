package de.codeschluss.portal.core.exception;

/**
 * The Class NotFoundException.
 * 
 * @author Valmir Etemi
 *
 */
public class NotFoundException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public NotFoundException(String param) {
    super("Could not find data for param: " + param);
  }
  
  public NotFoundException() {
    super("Could not find data for param");
  }
}