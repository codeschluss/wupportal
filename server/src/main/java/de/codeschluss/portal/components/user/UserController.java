package de.codeschluss.portal.components.user;

import static org.springframework.http.ResponseEntity.created;
import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.components.activity.ActivityService;
import de.codeschluss.portal.components.organisation.OrganisationService;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.components.provider.ProviderService;
import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.api.dto.BooleanPrimitive;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.api.dto.StringPrimitive;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.security.permissions.OwnUserOrSuperUserPermission;
import de.codeschluss.portal.core.security.permissions.OwnUserPermission;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// TODO: Auto-generated Javadoc
/**
 * The Class UserController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class UserController extends CrudController<UserEntity, UserService> {

  /** The provider service. */
  private final ProviderService providerService;
  
  /** The activity service. */
  private final ActivityService activityService;
  
  /** The organisation service. */
  private final OrganisationService organisationService;

  /**
   * Instantiates a new user controller.
   *
   * @param userService the user service
   * @param providerService the provider service
   * @param activityService the activity service
   * @param organisationService the organisation service
   */
  public UserController(
      UserService userService, 
      ProviderService providerService,
      ActivityService activityService, 
      OrganisationService organisationService) {
    super(userService);
    this.providerService = providerService;
    this.activityService = activityService;
    this.organisationService = organisationService;
  }

  @Override
  @GetMapping("/users")
  @SuperUserPermission
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    return super.readAll(params);
  }

  @Override
  @GetMapping("/users/{userId}")
  @OwnUserOrSuperUserPermission
  public Resource<UserEntity> readOne(@PathVariable String userId) {
    return super.readOne(userId);
  }

  @Override
  @PostMapping("/users")
  public ResponseEntity<?> create(@RequestBody UserEntity newUser) throws URISyntaxException {
    validateCreate(newUser);
    try {
      UserEntity createdUser = service.add(newUser);
      
      if (newUser.getOrganisationRegistrations() != null 
          && !newUser.getOrganisationRegistrations().isEmpty()) {
        providerService.createApplication(createdUser, newUser.getOrganisationRegistrations());
      }
      
      return created(new URI(createdUser.toResource().getId().expand().getHref()))
          .body(createdUser.toResource());
    } catch (NotFoundException | NullPointerException e) {
      throw new BadParamsException("User or Organisation are null or do not exist!");
    }
  }

  @Override
  @PutMapping("/users/{userId}")
  @OwnUserPermission
  public ResponseEntity<?> update(@RequestBody UserEntity newUser, @PathVariable String userId)
      throws URISyntaxException {
    return super.update(newUser, userId);
  }

  @Override
  @DeleteMapping("/users/{userId}")
  @OwnUserOrSuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String userId) {
    return super.delete(userId);
  }

  /**
   * Grant superuser right.
   *
   * @param userId the user id
   * @param isSuperuser the is superuser
   * @return the response entity
   */
  @PutMapping("/users/{userId}/superuser")
  @SuperUserPermission
  public ResponseEntity<?> grantSuperuserRight(@PathVariable String userId,
      @RequestBody BooleanPrimitive isSuperuser) {
    try {
      service.grantSuperUser(userId, isSuperuser.getValue());
      return noContent().build();
    } catch (NotFoundException e) {
      throw new BadParamsException("User with given ID does not exist!");
    }
  }

  /**
   * Read organisations.
   *
   * @param userId the user id
   * @return the response entity
   */
  @GetMapping("/users/{userId}/organisations")
  @OwnUserOrSuperUserPermission
  public ResponseEntity<?> readOrganisations(
      @PathVariable String userId) {
    List<ProviderEntity> providers = providerService.getProvidersByUser(userId);
    return ok(organisationService.convertToResourcesEmbeddedProviders(providers));
  }

  /**
   * Adds the organisation.
   *
   * @param userId the user id
   * @param organisationParam the organisation param
   * @return the response entity
   */
  @PostMapping("/users/{userId}/organisations")
  @OwnUserOrSuperUserPermission
  public ResponseEntity<?> addOrganisation(@PathVariable String userId,
      @RequestBody List<String> organisationParam) {
    try {
      return ok(providerService.createApplication(
          service.getById(userId), organisationParam));
    } catch (NotFoundException | NullPointerException e) {
      throw new BadParamsException("User or Organisation are null or do not exist!");
    }
  }

  /**
   * Delete organisation.
   *
   * @param userId the user id
   * @param orgaId the orga id
   * @return the response entity
   */
  @DeleteMapping("/users/{userId}/organisations/{orgaId}")
  @OwnUserOrSuperUserPermission
  public ResponseEntity<?> deleteOrganisation(@PathVariable String userId,
      @PathVariable String orgaId) {
    try {
      providerService.deleteForUserAndOrga(userId, orgaId);
      return noContent().build();
    } catch (NotFoundException e) {
      return noContent().build();
    }
  }

  /**
   * Read activities.
   *
   * @param userId the user id
   * @return the response entity
   */
  @GetMapping("/users/{userId}/activities")
  // TODO: Visible for all?
  public ResponseEntity<?> readActivities(
      @PathVariable String userId,
      BaseParams params) {
    List<ProviderEntity> providers = providerService.getProvidersByUser(userId);
    try {
      return ok(activityService.getResourcesByProviders(providers, params));
    } catch (IOException e) {
      throw new RuntimeException(e.getMessage());
    }
  }

  /**
   * Delete activity.
   *
   * @param userId the user id
   * @param activityId the activity id
   * @return the response entity
   */
  @DeleteMapping("/users/{userId}/activities/{activityId}")
  @OwnUserOrSuperUserPermission
  public ResponseEntity<?> deleteActivity(@PathVariable String userId,
      @PathVariable String activityId) {
    if (activityService.isActivityForProvider(
        activityId, providerService.getProvidersByUser(userId))) {
      activityService.delete(activityId);
      return noContent().build();
    } else {
      throw new BadParamsException("Activity does not match given user!");
    }
  }

  /**
   * Reset password.
   *
   * @param username the username
   * @return the response entity
   * @throws MessagingException the messaging exception
   */
  @PutMapping("/users/resetpassword")
  public ResponseEntity<?> resetPassword(@RequestBody StringPrimitive username) 
      throws MessagingException {
    if (service.resetPassword(username.getValue())) {
      return noContent().build();
    } else {
      throw new BadParamsException(
          "Password is not reset. User does not exist or Mail is mistyped");
    }
  }
}
