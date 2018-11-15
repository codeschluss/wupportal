package de.codeschluss.portal.common.security.permissions;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.access.prepost.PreAuthorize;

@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("@authorizationService.isProviderUser(authentication) or @authorizationService.isSuperUser(authentication)")
public @interface ProviderOrSuperUserPermission {

}
