package de.codeschluss.portal.core.security.services;

import de.codeschluss.portal.components.activity.ActivityService;
import de.codeschluss.portal.components.organisation.OrganisationService;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.security.jwt.JwtUserDetails;

import java.util.Arrays;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class AuthorizationService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class AuthorizationService {
  
  /** The organisation service. */
  private final OrganisationService organisationService;


  /**
   * Instantiates a new authorization service.
   *
   * @param actitivityService the actitivity service
   * @param organisationService the organisation service
   */
  public AuthorizationService(
      ActivityService actitivityService,
      OrganisationService organisationService) {
    this.organisationService = organisationService;
  }

  /**
   * Checks if is own user.
   *
   * @param authentication the authentication
   * @param userId the user id
   * @return true, if is own user
   */
  public boolean isOwnUser(Authentication authentication, String userId) {
    if (authentication.getPrincipal() instanceof JwtUserDetails) {
      JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
      return jwtUserDetails.getUser().getId().equals(userId);
    }
    return false;

  }

  /**
   * Checks if is super user.
   *
   * @param authentication the authentication
   * @return true, if is super user
   */
  public boolean isSuperUser(Authentication authentication) {
    if (authentication.getPrincipal() instanceof JwtUserDetails) {
      JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
      return jwtUserDetails.isSuperUser();
    }
    return false;
  }

  /**
   * Checks if is orga admin.
   *
   * @param authentication the authentication
   * @param organisationId the organisation id
   * @return true, if is orga admin
   */
  public boolean isOrgaAdmin(Authentication authentication, String organisationId) {
    if (authentication.getPrincipal() instanceof JwtUserDetails) {
      JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
      return Arrays.asList(jwtUserDetails.getAdminOrgas()).contains(organisationId);
    }
    return false;
  }

  /**
   * Checks if is provider user.
   *
   * @param authentication the authentication
   * @return true, if is provider user
   */
  public boolean isProviderUser(Authentication authentication) {
    if (authentication.getPrincipal() instanceof JwtUserDetails) {
      JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
      return jwtUserDetails.getApprovedOrganisations() != null
          && jwtUserDetails.getApprovedOrganisations().length > 0;
    }
    return false;
  }

  /**
   * Checks if is own activity.
   *
   * @param authentication the authentication
   * @param activityId the activity id
   * @return true, if is own activity
   */
  public boolean isOwnActivity(Authentication authentication, String activityId) {
    if (authentication.getPrincipal() instanceof JwtUserDetails) {
      JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
      return Arrays.asList(jwtUserDetails.getCreatedActivities()).contains(activityId);
    }
    return false;
  }

  /**
   * Checks if is orga activity.
   *
   * @param authentication the authentication
   * @param activityId the activity id
   * @return true, if is orga activity
   */
  public boolean isOrgaActivity(Authentication authentication, String activityId) {
    try {
      if (authentication.getPrincipal() instanceof JwtUserDetails) {
        JwtUserDetails jwtUserDetails = (JwtUserDetails) authentication.getPrincipal();
        String orgaId = organisationService.getOrgaActivity(activityId).getId();
        return Arrays.asList(jwtUserDetails.getAdminOrgas()).contains(orgaId);
      }
      return false;
    } catch (NotFoundException e) {
      return false;
    }
  }

  /**
   * Gets the current user.
   *
   * @return the current user
   */
  public UserEntity getCurrentUser() {
    if (SecurityContextHolder.getContext().getAuthentication()
        .getPrincipal() instanceof JwtUserDetails) {
      JwtUserDetails jwtUserDetails = (JwtUserDetails) SecurityContextHolder.getContext()
          .getAuthentication().getPrincipal();
      validateUser(jwtUserDetails);
      return jwtUserDetails.getUser();
    }
    throw new RuntimeException("Something went wrong. UserDetails are configured wrongly");
  }
  
  /**
   * Validate user.
   *
   * @param jwtUserDetails the jwt user details
   */
  private void validateUser(JwtUserDetails jwtUserDetails) {
    if (jwtUserDetails == null || jwtUserDetails.getUser() == null) {
      throw new AccessDeniedException("No authenticated user");
    }
  }
}
