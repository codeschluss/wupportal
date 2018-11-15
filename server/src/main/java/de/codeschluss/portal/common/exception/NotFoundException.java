package de.codeschluss.portal.common.exception;

public class NotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public NotFoundException(String param) {
		super("Could not find data for param: " + param);
	}
}