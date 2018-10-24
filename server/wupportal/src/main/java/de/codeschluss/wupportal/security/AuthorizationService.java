package de.codeschluss.wupportal.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


@Service
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
	public boolean isSuperUser(Authentication authentication) {
		if (authentication.getPrincipal() instanceof JWTUserDetails) {
			JWTUserDetails jwtUserDetails = (JWTUserDetails) authentication.getPrincipal();
			return jwtUserDetails.isSuperUser();
		}
		return false;
	}
}
