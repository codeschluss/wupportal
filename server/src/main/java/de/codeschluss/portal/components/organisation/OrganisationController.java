package de.codeschluss.portal.components.organisation;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.components.activity.ActivityService;
import de.codeschluss.portal.components.address.AddressService;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.components.provider.ProviderService;
import de.codeschluss.portal.components.user.UserService;
import de.codeschluss.portal.core.common.CrudController;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.security.permissions.OrgaAdminOrSuperUserPermission;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import java.net.URISyntaxException;
import java.util.List;

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
 * The Class OrganisationController.
 */
@RestController
public class OrganisationController
    extends CrudController<OrganisationEntity, OrganisationService> {

  /** The provider service. */
  private final ProviderService providerService;

  /** The user service. */
  private final UserService userService;

  /** The address service. */
  private final AddressService addressService;

  /** The activity service. */
  private final ActivityService activityService;

  /**
   * Instantiates a new organisation controller.
   *
   * @param service
   *          the service
   * @param providerService
   *          the provider service
   * @param userService
   *          the user service
   * @param addressService
   *          the address service
   * @param activityService
   *          the activity service
   */
  public OrganisationController(OrganisationService service, ProviderService providerService,
      UserService userService, AddressService addressService, ActivityService activityService) {
    super(service);
    this.providerService = providerService;
    this.userService = userService;
    this.addressService = addressService;
    this.activityService = activityService;
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.CrudController#findAll(de.codeschluss.
   * portal.core.utils.FilterSortPaginate)
   */
  @Override
  @GetMapping("/organisations")
  public ResponseEntity<?> findAll(FilterSortPaginate params) {
    return super.findAll(params);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#findOne(java.lang.String)
   */
  @Override
  @GetMapping("/organisations/{organisationId}")
  public Resource<OrganisationEntity> findOne(@PathVariable String organisationId) {
    return super.findOne(organisationId);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#add(de.codeschluss.portal.
   * core.common.BaseEntity)
   */
  @Override
  @PostMapping("/organisations")
  @SuperUserPermission
  public ResponseEntity<?> add(@RequestBody OrganisationEntity newOrga) throws URISyntaxException {
    return super.add(newOrga);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#update(de.codeschluss.portal
   * .core.common.BaseEntity, java.lang.String)
   */
  @Override
  @PutMapping("/organisations/{organisationId}")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> update(@RequestBody OrganisationEntity newOrga,
      @PathVariable String organisationId) throws URISyntaxException {
    return super.update(newOrga, organisationId);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#delete(java.lang.String)
   */
  @Override
  @DeleteMapping("/organisations/{organisationId}")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String organisationId) {
    return super.delete(organisationId);
  }

  /**
   * Find address.
   *
   * @param organisationId
   *          the organisation id
   * @return the response entity
   */
  @GetMapping("/organisations/{organisationId}/address")
  public ResponseEntity<?> findAddress(@PathVariable String organisationId) {
    return ok(addressService.getResourcesWithSuburbsByOrganisation(organisationId));
  }

  /**
   * Update address.
   *
   * @param organisationId
   *          the organisation id
   * @param addressId
   *          the address id
   * @return the response entity
   */
  @PutMapping("/organisations/{organisationId}/address")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> updateAddress(@PathVariable String organisationId,
      @RequestBody String addressId) {
    if (addressService.existsById(addressId) && service.existsById(organisationId)) {
      service.updateAddress(organisationId, addressService.getById(addressId));
      return ok(findAddress(organisationId));
    } else {
      throw new BadParamsException("Organisation or Address with given ID do not exist!");
    }
  }

  /**
   * Find activities.
   *
   * @param organisationId
   *          the organisation id
   * @return the response entity
   */
  @GetMapping("/organisations/{organisationId}/activities")
  public ResponseEntity<?> findActivities(@PathVariable String organisationId) {
    List<ProviderEntity> providers = providerService.getProvidersByOrganisation(organisationId);
    return ok(activityService.getResourcesByProviders(providers));
  }

  /**
   * Delete activity.
   *
   * @param organisationId
   *          the organisation id
   * @param activityId
   *          the activity id
   * @return the response entity
   */
  @DeleteMapping("/organisations/{organisationId}/activities/{activityId}")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> deleteActivity(@PathVariable String organisationId,
      @PathVariable String activityId) {
    if (activityService.isActivityForProvider(activityId,
        providerService.getProvidersByOrganisation(organisationId))) {
      activityService.delete(activityId);
      return noContent().build();
    } else {
      throw new BadParamsException("Activity does not match given organisation!");
    }
  }

  /**
   * Find users by organisation.
   *
   * @param organisationId
   *          the organisation id
   * @return the response entity
   */
  @GetMapping("/organisations/{organisationId}/users")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> findUsersByOrganisation(@PathVariable String organisationId) {
    List<ProviderEntity> providers = providerService.getProvidersByOrganisation(organisationId);
    return ok(userService.convertToResourcesWithProviders(providers));
  }

  /**
   * Approve or reject user.
   *
   * @param organisationId
   *          the organisation id
   * @param userId
   *          the user id
   * @param isApproved
   *          the is approved
   * @return the response entity
   */
  @PutMapping("/organisations/{organisationId}/users/{userId}/approve")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> approveOrRejectUser(@PathVariable String organisationId,
      @PathVariable String userId, @RequestBody Boolean isApproved) {
    try {
      this.providerService.setApprovedByUserAndOrga(userId, organisationId, isApproved);
      return noContent().build();
    } catch (NotFoundException e) {
      throw new BadParamsException("User with given ID does not exist in given Organisation!");
    }
  }

  /**
   * Grant admin right.
   *
   * @param organisationId
   *          the organisation id
   * @param userId
   *          the user id
   * @param isAdmin
   *          the is admin
   * @return the response entity
   */
  @PutMapping("/organisations/{organisationId}/users/{userId}/admin")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> grantAdminRight(@PathVariable String organisationId,
      @PathVariable String userId, @RequestBody Boolean isAdmin) {
    try {
      this.providerService.setAdminByUserAndOrga(userId, organisationId, isAdmin);
      return noContent().build();
    } catch (NotFoundException e) {
      throw new BadParamsException("User with given ID does not exist in given Organisation!");
    }
  }

  /**
   * Delete user.
   *
   * @param organisationId
   *          the organisation id
   * @param userId
   *          the user id
   * @return the response entity
   */
  @DeleteMapping("/organisations/{organisationId}/users/{userId}")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> deleteUser(@PathVariable String organisationId,
      @PathVariable String userId) {
    try {
      providerService.deleteForUserAndOrga(userId, organisationId);
      return noContent().build();
    } catch (NotFoundException e) {
      return noContent().build();
    }
  }
}
