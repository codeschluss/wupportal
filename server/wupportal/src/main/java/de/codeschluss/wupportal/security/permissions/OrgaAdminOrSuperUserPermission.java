package de.codeschluss.wupportal.security.permissions;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.access.prepost.PreAuthorize;

@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("@authorizationService.isOrgaAdmin(authentication, #providerId) or @authorizationService.isSuperUser(authentication)")
public @interface OrgaAdminOrSuperUserPermission {

}
