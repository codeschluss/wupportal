package de.codeschluss.portal.common.security.permissions;

import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("@authorizationService.showUser(#activityId) or @authorizationService.isSuperUser(authentication)")
public @interface ShowUserOrSuperUserPermission {

}
