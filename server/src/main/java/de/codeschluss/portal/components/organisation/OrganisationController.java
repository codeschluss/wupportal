package de.codeschluss.portal.components.organisation;

import static org.springframework.http.ResponseEntity.created;
import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.components.activity.ActivityService;
import de.codeschluss.portal.components.address.AddressService;
import de.codeschluss.portal.components.images.organisation.OrganisationImageService;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.components.provider.ProviderService;
import de.codeschluss.portal.components.user.UserService;
import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.i18n.translation.TranslationService;
import de.codeschluss.portal.core.security.permissions.Authenticated;
import de.codeschluss.portal.core.security.permissions.OrgaAdminOrSuperUserPermission;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;
import de.codeschluss.portal.core.security.services.AuthorizationService;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

// TODO: Auto-generated Javadoc
/**
 * The Class OrganisationController.
 * 
 * @author Valmir Etemi
 *
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
  
  /** The translation service. */
  private final TranslationService translationService;
  
  /** The image service. */
  private final OrganisationImageService organisationImageService;
  
  /** The authorization service. */
  private final AuthorizationService authService;

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
      UserService userService, AddressService addressService, ActivityService activityService,
      TranslationService translationService, OrganisationImageService organisationImageService,
      AuthorizationService authService) {
    super(service);
    this.providerService = providerService;
    this.userService = userService;
    this.addressService = addressService;
    this.activityService = activityService;
    this.translationService = translationService;
    this.organisationImageService = organisationImageService;
    this.authService = authService;
  }

  @GetMapping("/organisations")
  public ResponseEntity<?> readAll(OrganisationQueryParam params) {
    return super.readAll(params);
  }

  @Override
  @GetMapping("/organisations/{organisationId}")
  public Resource<OrganisationEntity> readOne(@PathVariable String organisationId) {
    return super.readOne(organisationId);
  }

  @Override
  @PostMapping("/organisations")
  @Authenticated
  public ResponseEntity<?> create(@RequestBody OrganisationEntity newOrga) 
      throws URISyntaxException {
    validateCreate(newOrga);
    
    Resource<OrganisationEntity> resource = service.convertToResource(
        createOrgaWithAdmin(newOrga));
    
    return created(new URI(resource.getId().expand().getHref())).body(resource);
  }

  /**
   * Creates the orga with admin.
   *
   * @param newOrga the new orga
   * @return the organisation entity
   */
  private OrganisationEntity createOrgaWithAdmin(OrganisationEntity newOrga) {
    OrganisationEntity orga = service.add(newOrga);
    ProviderEntity admin = new ProviderEntity(true, true, null, orga, authService.getCurrentUser());
    providerService.add(admin);
    return orga;
  }
  
  /**
   * Grant approval and if isApproved is false, it will delete all existing activities.
   *
   * @param organisationId the organisation id
   * @param isApproved the is approved
   * @return the response entity
   */
  @PutMapping("/organisations/{organisationId}/approve")
  @SuperUserPermission
  public ResponseEntity<?> grantApproval(
      @PathVariable String organisationId,
      @RequestBody Boolean isApproved) {
    try {
      service.setApproval(organisationId, isApproved);
      if (!isApproved) {
        List<ProviderEntity> providers = providerService.getProvidersByOrganisation(organisationId);
        activityService.deleteAllByProviders(providers);
      }
      return noContent().build();
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Organisation does not exist!");
    }
  }

  @Override
  @PutMapping("/organisations/{organisationId}")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> update(@RequestBody OrganisationEntity newOrga,
      @PathVariable String organisationId) throws URISyntaxException {
    return super.update(newOrga, organisationId);
  }

  @Override
  @DeleteMapping("/organisations/{organisationId}")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String organisationId) {
    return super.delete(organisationId);
  }

  /**
   * Read address.
   *
   * @param organisationId
   *          the organisation id
   * @return the response entity
   */
  @GetMapping("/organisations/{organisationId}/address")
  public ResponseEntity<?> readAddress(@PathVariable String organisationId) {
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
      return ok(readAddress(organisationId));
    } else {
      throw new BadParamsException("Organisation or Address with given ID do not exist!");
    }
  }

  /**
   * Read activities.
   *
   * @param organisationId
   *          the organisation id
   * @return the response entity
   */
  @GetMapping("/organisations/{organisationId}/activities")
  public ResponseEntity<?> readActivities(@PathVariable String organisationId) {
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
   * Read users.
   *
   * @param organisationId
   *          the organisation id
   * @return the response entity
   */
  @GetMapping("/organisations/{organisationId}/users")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> readUsers(@PathVariable String organisationId) {
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
      providerService.setApprovedByUserAndOrga(userId, organisationId, isApproved);
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
      providerService.setAdminByUserAndOrga(userId, organisationId, isAdmin);
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
  
  /**
   * Read translations.
   *
   * @param organisationId the organisation id
   * @return the response entity
   */
  @GetMapping("/organisations/{organisationId}/translations")
  public ResponseEntity<?> readTranslations(@PathVariable String organisationId) {
    try {
      return ok(translationService.getAllTranslations(service.getById(organisationId), this));
    } catch (NoSuchMethodException 
        | SecurityException 
        | IllegalAccessException
        | IllegalArgumentException
        | InvocationTargetException e) {
      throw new RuntimeException("Translations are not available");
    }
  }
  
  /**
   * Read images.
   *
   * @param organisationId
   *          the organisation id
   * @return the response entity
   */
  @GetMapping("/organisations/{organisationId}/images")
  public ResponseEntity<?> readImages(@PathVariable String organisationId) {
    return ok(organisationImageService.getResourcesByOrganisation(organisationId));
  }
  
  /**
   * Adds the image.
   *
   * @param organisationId the organisation id
   * @param caption the caption
   * @param imageFile the image file
   * @return the response entity
   */
  @PostMapping("/organisations/{organisationId}/images")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> addImage(@PathVariable String organisationId,
      @RequestParam(name = "caption", required = false) String caption, 
      @RequestParam("file") MultipartFile imageFile) {
    try {
      Resource<?> saved = organisationImageService.addResource(
          imageFile, caption, service.getById(organisationId));
      return ok(saved);
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Organisation does not exist");
    } catch (IOException e) {
      throw new BadParamsException("Image Upload not possible");
    }
  }

  /**
   * Delete images.
   *
   * @param organisationId
   *          the organisation id
   * @param imageId
   *          the image id
   * @return the response entity
   */
  @DeleteMapping("/organisations/{organisationId}/images/{imageId}")
  @OrgaAdminOrSuperUserPermission
  public ResponseEntity<?> deleteImages(@PathVariable String organisationId,
      @PathVariable String... imageId) {
    try {
      organisationImageService.deleteAll(Arrays.asList(imageId));
      return noContent().build();
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Organisation does not exist");
    }
  }
}
