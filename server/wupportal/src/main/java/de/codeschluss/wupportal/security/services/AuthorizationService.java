package de.codeschluss.wupportal.security.services;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.security.jwt.JWTUserDetails;


@Service
public class AuthorizationService {
	
	public boolean isOwnUser(Authentication authentication, String userId) {
		if (authentication.getPrincipal() instanceof JWTUserDetails) {
			JWTUserDetails jwtUserDetails = (JWTUserDetails) authentication.getPrincipal();
			return jwtUserDetails.getUser().getId().equals(userId);
		}
		return false;
		
	}
	
	public boolean isSuperUser(Authentication authentication) {
		if (authentication.getPrincipal() instanceof JWTUserDetails) {
			JWTUserDetails jwtUserDetails = (JWTUserDetails) authentication.getPrincipal();
			return jwtUserDetails.isSuperUser();
		}
		return false;
	}
	
//	public boolean isOrgaAdmin(Authentication authentication, String providerId) {
//		if (authentication.getPrincipal() instanceof JWTUserDetails) {
//			JWTUserDetails jwtUserDetails = (JWTUserDetails) authentication.getPrincipal();
//			return jwtUserDetails.getUser().getId().equals(userId);
//		}
//		return false;
//	}
}
