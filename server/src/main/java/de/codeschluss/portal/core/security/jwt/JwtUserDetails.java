package de.codeschluss.portal.core.security.jwt;

import de.codeschluss.portal.functional.user.UserEntity;

import java.util.Collections;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.springframework.security.core.userdetails.User;

// TODO: Auto-generated Javadoc
@Data
@EqualsAndHashCode(callSuper = true)
public class JwtUserDetails extends User {

  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = 1L;

  /** The user. */
  private UserEntity user;
  
  /** The approved organisations. */
  private String[] approvedOrganisations;
  
  /** The admin orgas. */
  private String[] adminOrgas;
  
  /** The created activities. */
  private String[] createdActivities;

  /**
   * Instantiates a new jwt user details.
   *
   * @param user the user
   * @param approvedOrgas the approved orgas
   * @param adminOrgas the admin orgas
   * @param createdActivities the created activities
   */
  public JwtUserDetails(UserEntity user, String[] approvedOrgas, String[] adminOrgas,
      String[] createdActivities) {
    super(user.getUsername(), user.getPassword(), Collections.emptyList());
    this.user = user;
    this.approvedOrganisations = approvedOrgas;
    this.adminOrgas = adminOrgas;
    this.createdActivities = createdActivities;
  }

  /**
   * Instantiates a new jwt user details.
   *
   * @param user the user
   */
  public JwtUserDetails(UserEntity user) {
    super(user.getUsername(), user.getPassword(), Collections.emptyList());
    this.user = user;
  }

  /**
   * Checks if is super user.
   *
   * @return true, if is super user
   */
  public boolean isSuperUser() {
    return this.user.isSuperuser();
  }
}
