package de.codeschluss.portal.exception;

public class NotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public NotFoundException(String id) {
		super("Could not find data for id: " + id);
	}
}