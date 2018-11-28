package de.codeschluss.portal.core.security.permissions;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.access.prepost.PreAuthorize;

/**
 * The Annotation OwnOrOrgaActivityOrSuperUserPermission.
 * 
 * @author Valmir Etemi
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("@authorizationService.isOwnActivity(authentication, #activityId) "
    + "or @authorizationService.isOrgaActivity(authentication, #activityId) "
    + "or @authorizationService.isSuperUser(authentication)")
public @interface OwnOrOrgaActivityOrSuperUserPermission {

}
