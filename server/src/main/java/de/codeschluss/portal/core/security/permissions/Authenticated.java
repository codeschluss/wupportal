package de.codeschluss.portal.core.security.permissions;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.access.prepost.PreAuthorize;

/**
 * The Annotation Authenticated. 
 * 
 * @author Valmir Etemi
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("isAuthenticated()")
public @interface Authenticated {

}
