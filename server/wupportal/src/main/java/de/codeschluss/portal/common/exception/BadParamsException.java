package de.codeschluss.portal.common.exception;

public class BadParamsException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BadParamsException(String message) {
		super("Bad param: " + message);
	}
}
