package de.codeschluss.wupportal.services;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpMethod;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import de.codeschluss.wupportal.user.UserEntity;

@Component
public class AuthorizationService {
	
//	public boolean isSuperUser(Authentication authentication) {
//		return ((User) authentication.getPrincipal()).getSuperuser();	
//	}
//	
//	public boolean isOwnUser(Authentication authentication, String userId) {
//		return ((User) authentication.getPrincipal()).getId() == userId;
//	}
//	
//	public boolean isOwnUserOrSuperUser(Authentication authentication, String userId) {
//		return isSuperUser(authentication) || isOwnUser(authentication, userId);
//	}
//	
//	public boolean isOwnUserOrNew(Authentication authentication, HttpServletRequest request) {
//		return request.getMethod() == HttpMethod.PUT.toString();
//	}
}
