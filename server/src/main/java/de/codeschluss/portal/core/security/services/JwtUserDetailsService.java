package de.codeschluss.portal.core.security.services;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.activity.ActivityService;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.components.provider.ProviderService;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.components.user.UserService;
import de.codeschluss.portal.core.security.jwt.JwtUserDetails;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * The Class JwtUserDetailsService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class JwtUserDetailsService implements UserDetailsService {

  private final UserService userService;
  private final ProviderService providerService;
  private final ActivityService activityService;

  /**
   * Instantiates a new jwt user details service.
   *
   * @param userService
   *          the user service
   * @param providerService
   *          the provider service
   * @param activityService
   *          the activity service
   */
  public JwtUserDetailsService(UserService userService, ProviderService providerService,
      ActivityService activityService) {
    this.userService = userService;
    this.providerService = providerService;
    this.activityService = activityService;
  }

  @Override
  public JwtUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserEntity user = this.userService.getUser(username);

    return new JwtUserDetails(user, getApprovedOrgasForApprovedProvider(user),
        getOrgaForAdmin(user), getCreatedActivities(user));
  }

  private String[] getCreatedActivities(UserEntity user) {
    List<ActivityEntity> activities = this.activityService.getByUser(user);
    return activities == null || activities.isEmpty() ? new String[0]
        : (String[]) activities.stream().map(activity -> activity.getId()).toArray(String[]::new);

  }

  private String[] getOrgaForAdmin(UserEntity user) {
    List<ProviderEntity> providers = providerService.getOrgaAdminProviders(user);
    return providers == null || providers.isEmpty() ? new String[0]
        : (String[]) providers.stream().map(provider -> provider.getOrganisation().getId())
            .toArray(String[]::new);
  }

  private String[] getApprovedOrgasForApprovedProvider(UserEntity user) {
    List<ProviderEntity> providers = providerService.getApprovedProviders(user);
    return providers == null || providers.isEmpty() ? new String[0]
        : (String[]) providers.stream().map(provider -> provider.getOrganisation().getId())
            .toArray(String[]::new);
  }
}