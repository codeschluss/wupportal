package de.codeschluss.portal.common.security.services;

import java.util.Arrays;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.security.jwt.JWTUserDetails;
import de.codeschluss.portal.functional.activity.ActivityService;
import de.codeschluss.portal.functional.user.UserEntity;


@Service
public class AuthorizationService {
	
	private final ActivityService actitivityService;
	
	public AuthorizationService(ActivityService actitivityService) {
		this.actitivityService = actitivityService;
	}
	
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
	
	public boolean isOrgaAdmin(Authentication authentication, String organisationId) {
		if (authentication.getPrincipal() instanceof JWTUserDetails) {
			JWTUserDetails jwtUserDetails = (JWTUserDetails) authentication.getPrincipal();
			return Arrays.asList(jwtUserDetails.getAdminOrgas()).contains(organisationId);
		}
		return false;
	}
	
	public boolean isProviderUser(Authentication authentication) {
		if (authentication.getPrincipal() instanceof JWTUserDetails) {
			JWTUserDetails jwtUserDetails = (JWTUserDetails) authentication.getPrincipal();
			return jwtUserDetails.getApprovedOrganisations() != null && jwtUserDetails.getApprovedOrganisations().length > 0; 
		}
		return false;
	}
	
	public boolean isOwnActivity(Authentication authentication, String activityId) {
		if (authentication.getPrincipal() instanceof JWTUserDetails) {
			JWTUserDetails jwtUserDetails = (JWTUserDetails) authentication.getPrincipal();
			return Arrays.asList(jwtUserDetails.getCreatedActivities()).contains(activityId);
		}
		return false;
	}
	
	public boolean isOrgaActivity(Authentication authentication, String activityId) {
		if (authentication.getPrincipal() instanceof JWTUserDetails) {
			JWTUserDetails jwtUserDetails = (JWTUserDetails) authentication.getPrincipal();
			String orgaId = actitivityService.getById(activityId).getProvider().getOrganisation().getId();
			return Arrays.asList(jwtUserDetails.getAdminOrgas()).contains(orgaId);
		}
		return false;
	}
	
	public boolean showUser(String activityId) {
		return actitivityService.getById(activityId).isShowUser();
	}

	public UserEntity getCurrentUser() {
		if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof JWTUserDetails) {
			JWTUserDetails jwtUserDetails = (JWTUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			return jwtUserDetails.getUser();
		}
		throw new RuntimeException("Something went wrong. UserDetails are configured wrongly");
	}
}
