package de.codeschluss.portal.components.activity;

import static org.springframework.http.ResponseEntity.created;
import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.components.address.AddressService;
import de.codeschluss.portal.components.category.CategoryService;
import de.codeschluss.portal.components.organisation.OrganisationService;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.components.provider.ProviderService;
import de.codeschluss.portal.components.schedule.ScheduleEntity;
import de.codeschluss.portal.components.schedule.ScheduleService;
import de.codeschluss.portal.components.tag.TagEntity;
import de.codeschluss.portal.components.tag.TagService;
import de.codeschluss.portal.components.targetgroup.TargetGroupService;
import de.codeschluss.portal.components.user.UserService;
import de.codeschluss.portal.core.common.CrudController;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.security.permissions.OwnActivityPermission;
import de.codeschluss.portal.core.security.permissions.OwnOrOrgaActivityOrSuperUserPermission;
import de.codeschluss.portal.core.security.permissions.ProviderPermission;
import de.codeschluss.portal.core.security.permissions.ShowUserOrSuperUserPermission;
import de.codeschluss.portal.core.security.services.AuthorizationService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
 * The Class ActivityController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class ActivityController extends CrudController<ActivityEntity, ActivityService> {

  /** The address service. */
  private final AddressService addressService;

  /** The category service. */
  private final CategoryService categoryService;

  /** The provider service. */
  private final ProviderService providerService;

  /** The user service. */
  private final UserService userService;

  /** The tag service. */
  private final TagService tagService;

  /** The target group service. */
  private final TargetGroupService targetGroupService;

  /** The schedule service. */
  private final ScheduleService scheduleService;

  /** The organisation service. */
  private final OrganisationService organisationService;

  /** The auth service. */
  private final AuthorizationService authService;

  /**
   * Controller for activity domain.
   * 
   * @param service
   *          own domain service
   * @param addressService
   *          address domain service
   * @param categoryService
   *          category domain service
   * @param providerService
   *          provider domain service
   * @param userService
   *          user domain service
   * @param tagService
   *          tag domain service
   * @param targetGroupService
   *          target group domain service
   * @param scheduleService
   *          schedule domain service
   * @param organisationService
   *          organisation domain service
   * @param authService
   *          authorization service
   */
  public ActivityController(ActivityService service, AddressService addressService,
      CategoryService categoryService, ProviderService providerService, UserService userService,
      TagService tagService, TargetGroupService targetGroupService, ScheduleService scheduleService,
      OrganisationService organisationService, AuthorizationService authService) {
    super(service);
    this.addressService = addressService;
    this.categoryService = categoryService;
    this.providerService = providerService;
    this.userService = userService;
    this.tagService = tagService;
    this.targetGroupService = targetGroupService;
    this.scheduleService = scheduleService;
    this.organisationService = organisationService;
    this.authService = authService;
  }

  /**
   * Find all.
   *
   * @param params
   *          the params
   * @return the response entity
   */
  @GetMapping("/activities")
  public ResponseEntity<?> findAll(ActivityQueryParam params) {
    return super.findAll(params);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#findOne(java.lang.String)
   */
  @Override
  @GetMapping("/activities/{activityId}")
  public Resource<ActivityEntity> findOne(@PathVariable String activityId) {
    return super.findOne(activityId);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#add(de.codeschluss.portal.
   * core.common.BaseEntity)
   */
  @Override
  @PostMapping("/activities")
  @ProviderPermission
  public ResponseEntity<?> add(@RequestBody ActivityEntity newActivity) throws URISyntaxException {
    if (service.getExisting(newActivity) != null) {
      throw new DuplicateEntryException("Activity already exists!");
    }

    try {
      newActivity.setProvider(getProvider(newActivity.getOrganisationId()));
      newActivity.setCategory(categoryService.getById(newActivity.getCategoryId()));
      newActivity.setAddress(addressService.getById(newActivity.getAddressId()));
      // TODO: Check if target groups are nullable!
    } catch (NotFoundException e) {
      throw new BadParamsException("Need existing Provider, Category or Address");
    }

    Resource<ActivityEntity> resource = service.addResource(newActivity);
    return created(new URI(resource.getId().expand().getHref())).body(resource);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#update(de.codeschluss.portal
   * .core.common.BaseEntity, java.lang.String)
   */
  @Override
  @PutMapping("/activities/{activityId}")
  @OwnOrOrgaActivityOrSuperUserPermission
  public ResponseEntity<?> update(@RequestBody ActivityEntity newActivity,
      @PathVariable String activityId) throws URISyntaxException {
    return super.update(newActivity, activityId);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#delete(java.lang.String)
   */
  @Override
  @DeleteMapping("/activities/{activityId}")
  @OwnOrOrgaActivityOrSuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String activityId) {
    return super.delete(activityId);
  }

  /**
   * Find address.
   *
   * @param activityId
   *          the activity id
   * @return the response entity
   */
  @GetMapping("/activities/{activityId}/address")
  public ResponseEntity<?> findAddress(@PathVariable String activityId) {
    return ok(addressService.getResourcesWithSuburbsByActivity(activityId));
  }

  /**
   * Update address.
   *
   * @param activityId
   *          the activity id
   * @param addressId
   *          the address id
   * @return the response entity
   */
  @PutMapping("/activities/{activityId}/address")
  @OwnOrOrgaActivityOrSuperUserPermission
  public ResponseEntity<?> updateAddress(@PathVariable String activityId,
      @RequestBody String addressId) {
    if (addressService.existsById(addressId) && service.existsById(activityId)) {
      service.updateAddress(activityId, addressService.getById(addressId));
      return findAddress(activityId);
    } else {
      throw new BadParamsException("Activity or Address with given ID do not exist!");
    }
  }

  /**
   * Find category.
   *
   * @param activityId
   *          the activity id
   * @return the response entity
   */
  @GetMapping("/activities/{activityId}/category")
  public ResponseEntity<?> findCategory(@PathVariable String activityId) {
    return ok(categoryService.getResourceByActivity(activityId));
  }

  /**
   * Update category.
   *
   * @param activityId
   *          the activity id
   * @param categoryId
   *          the category id
   * @return the response entity
   */
  @PutMapping("/activities/{activityId}/category")
  @OwnOrOrgaActivityOrSuperUserPermission
  public ResponseEntity<?> updateCategory(@PathVariable String activityId,
      @RequestBody String categoryId) {
    if (service.existsById(activityId) && categoryService.existsById(categoryId)) {
      service.updateCategory(activityId, categoryService.getById(categoryId));
      return findCategory(activityId);
    } else {
      throw new BadParamsException("Activity or Category with given ID do not exist!");
    }
  }

  /**
   * Find organisation.
   *
   * @param activityId
   *          the activity id
   * @return the response entity
   */
  @GetMapping("/activities/{activityId}/organisation")
  public ResponseEntity<?> findOrganisation(@PathVariable String activityId) {
    ProviderEntity provider = providerService.getProviderByActivity(activityId);
    return ok(organisationService.convertToResource(provider));
  }

  /**
   * Update organisation.
   *
   * @param activityId
   *          the activity id
   * @param organisationId
   *          the organisation id
   * @return the response entity
   */
  @PutMapping("/activities/{activityId}/organisation")
  @OwnActivityPermission
  public ResponseEntity<?> updateOrganisation(@PathVariable String activityId,
      @RequestBody String organisationId) {
    try {
      service.updateProvider(activityId, getProvider(organisationId));
      return findOrganisation(activityId);
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Activity, Organisation or Provider do not exist!");
    }
  }

  /**
   * Find user.
   *
   * @param activityId
   *          the activity id
   * @return the response entity
   */
  @GetMapping("/activities/{activityId}/user")
  @ShowUserOrSuperUserPermission
  public ResponseEntity<?> findUser(@PathVariable String activityId) {
    ProviderEntity provider = providerService.getProviderByActivity(activityId);
    return ok(userService.getResourceByProvider(provider));
  }

  /**
   * Find tags.
   *
   * @param activityId
   *          the activity id
   * @return the response entity
   */
  @GetMapping("/activities/{activityId}/tags")
  public ResponseEntity<?> findTags(@PathVariable String activityId) {
    return ok(tagService.getResourcesByActivity(activityId));
  }

  /**
   * Adds the tags.
   *
   * @param activityId
   *          the activity id
   * @param tags
   *          the tags
   * @return the response entity
   */
  @PostMapping("/activities/{activityId}/tags")
  @OwnOrOrgaActivityOrSuperUserPermission
  public ResponseEntity<?> addTags(@PathVariable String activityId,
      @RequestBody TagEntity... tags) {
    try {
      service.addTags(activityId, tagService.addAll(Arrays.asList(tags)));
      return findTags(activityId);
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Activity does not exist");
    }
  }

  /**
   * Delete tags.
   *
   * @param activityId
   *          the activity id
   * @param tagId
   *          the tag id
   * @return the response entity
   */
  @DeleteMapping("/activities/{activityId}/tags/{tagId}")
  @OwnOrOrgaActivityOrSuperUserPermission
  public ResponseEntity<?> deleteTags(@PathVariable String activityId,
      @PathVariable String... tagId) {
    try {
      service.deleteTags(activityId, Arrays.asList(tagId));
      return noContent().build();
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Activity does not exist");
    }
  }

  /**
   * Find target groups.
   *
   * @param activityId
   *          the activity id
   * @return the response entity
   */
  @GetMapping("/activities/{activityId}/targetgroups")
  public ResponseEntity<?> findTargetGroups(@PathVariable String activityId) {
    return ok(targetGroupService.getResourceByActivity(activityId));
  }

  /**
   * Adds the target groups.
   *
   * @param activityId
   *          the activity id
   * @param targetGroupIds
   *          the target group ids
   * @return the response entity
   */
  @PostMapping("/activities/{activityId}/targetgroups")
  @OwnOrOrgaActivityOrSuperUserPermission
  public ResponseEntity<?> addTargetGroups(@PathVariable String activityId,
      @RequestBody String... targetGroupIds) {
    try {
      List<String> distinctTargetGroups = Arrays.asList(targetGroupIds).stream().distinct()
          .collect(Collectors.toList());
      service.addTargetGroups(activityId, targetGroupService.getByIds(distinctTargetGroups));
      return findTargetGroups(activityId);
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Target Group or Activity do not exist");
    }
  }

  /**
   * Delete target groups.
   *
   * @param activityId
   *          the activity id
   * @param targetGroupId
   *          the target group id
   * @return the response entity
   */
  @DeleteMapping("/activities/{activityId}/targetgroups/{targetGroupId}")
  @OwnOrOrgaActivityOrSuperUserPermission
  public ResponseEntity<?> deleteTargetGroups(@PathVariable String activityId,
      @PathVariable String... targetGroupId) {
    try {
      service.deleteTargetGroup(activityId, Arrays.asList(targetGroupId));
      return noContent().build();
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Activity does not exist");
    }
  }

  /**
   * Find schedules.
   *
   * @param activityId
   *          the activity id
   * @return the response entity
   */
  @GetMapping("/activities/{activityId}/schedules")
  public ResponseEntity<?> findSchedules(@PathVariable String activityId) {
    return ok(scheduleService.getResourceByActivity(activityId));
  }

  /**
   * Adds the schedules.
   *
   * @param activityId
   *          the activity id
   * @param schedules
   *          the schedules
   * @return the response entity
   */
  @PostMapping("/activities/{activityId}/schedules")
  @OwnOrOrgaActivityOrSuperUserPermission
  public ResponseEntity<?> addSchedules(@PathVariable String activityId,
      @RequestBody ScheduleEntity... schedules) {
    try {
      service.addSchedules(activityId, scheduleService.addAll(Arrays.asList(schedules)));
      return findSchedules(activityId);
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Activity does not exist");
    }
  }

  /**
   * Delete schedules.
   *
   * @param activityId
   *          the activity id
   * @param scheduleId
   *          the schedule id
   * @return the response entity
   */
  @DeleteMapping("/activities/{activityId}/schedules/{scheduleId}")
  @OwnOrOrgaActivityOrSuperUserPermission
  public ResponseEntity<?> deleteSchedules(@PathVariable String activityId,
      @PathVariable String... scheduleId) {
    try {
      service.deleteSchedule(activityId, Arrays.asList(scheduleId));
      return noContent().build();
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Activity does not exist");
    }
  }

  /**
   * Gets the provider.
   *
   * @param organisationId
   *          the organisation id
   * @return the provider
   */
  private ProviderEntity getProvider(String organisationId) {
    return providerService.getProviderByUserAndOrganisation(authService.getCurrentUser().getId(),
        organisationId);
  }
}
