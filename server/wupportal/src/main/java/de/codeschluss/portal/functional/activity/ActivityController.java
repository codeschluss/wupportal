package de.codeschluss.portal.functional.activity;

import static org.springframework.http.ResponseEntity.created;
import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.core.DummyInvocationUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import de.codeschluss.portal.common.base.CrudController;
import de.codeschluss.portal.common.exception.BadParamsException;
import de.codeschluss.portal.common.exception.DuplicateEntryException;
import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.common.security.permissions.OwnActivityPermission;
import de.codeschluss.portal.common.security.permissions.OwnOrOrgaActivityOrSuperUserPermission;
import de.codeschluss.portal.common.security.permissions.ProviderPermission;
import de.codeschluss.portal.common.security.permissions.ShowUserOrSuperUserPermission;
import de.codeschluss.portal.common.security.services.AuthorizationService;
import de.codeschluss.portal.common.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.activity.ActivityEntity;
import de.codeschluss.portal.functional.address.AddressService;
import de.codeschluss.portal.functional.category.CategoryService;
import de.codeschluss.portal.functional.organisation.OrganisationService;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import de.codeschluss.portal.functional.provider.ProviderService;
import de.codeschluss.portal.functional.schedule.ScheduleEntity;
import de.codeschluss.portal.functional.schedule.ScheduleService;
import de.codeschluss.portal.functional.tag.TagEntity;
import de.codeschluss.portal.functional.tag.TagService;
import de.codeschluss.portal.functional.targetgroup.TargetGroupService;
import de.codeschluss.portal.functional.user.UserService;

@RestController
public class ActivityController extends CrudController<ActivityEntity, ActivityService> {

	private final AddressService addressService;
	private final CategoryService categoryService;
	private final ProviderService providerService;
	private final UserService userService;
	private final TagService tagService;
	private final TargetGroupService targetGroupService;
	private final ScheduleService scheduleService;
	private final OrganisationService organisationService;
	private final AuthorizationService authService;
	
	public ActivityController(ActivityService service,
			AddressService addressService,
			CategoryService categoryService,
			ProviderService providerService,
			UserService userService,
			TagService tagService,
			TargetGroupService targetGroupService,
			ScheduleService scheduleService,
			OrganisationService organisationService,
			AuthorizationService authService) {
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
	
	@Override
	@GetMapping("/activities")
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@Override
	@GetMapping("/activities/{activityId}")
	public Resource<ActivityEntity> findOne(@PathVariable String activityId) {
		return super.findOne(activityId);
	}
	
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
			//TODO: Check if target groups are nullable!
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Need existing Provider, Category or Address");
		}

		Resource<ActivityEntity> resource = service.addResource(newActivity);
		return created(new URI(resource.getId().expand().getHref())).body(resource);
	}

	@Override
	@PutMapping("/activities/{activityId}")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> update(@RequestBody ActivityEntity newActivity, @PathVariable String activityId) throws URISyntaxException {
		return super.update(newActivity, activityId);
	}
	
	@Override
	@DeleteMapping("/activities/{activityId}")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String activityId) {
		return super.delete(activityId);
	}
	
	@GetMapping("/activities/{activityId}/address")
	public ResponseEntity<?> findAddress(@PathVariable String activityId) {
		return ok(addressService.getResourcesWithSuburbsByActivity(activityId));
	}
	
	@PutMapping("/activities/{activityId}/address")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> updateAddress(@PathVariable String activityId, @RequestBody String addressId) {
		if (addressService.existsById(addressId) && service.existsById(activityId)) {
			service.updateAddress(activityId, addressService.getById(addressId));
			return findAddress(activityId);
		} else {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Activity or Address with given ID do not exist!");
		}		
	}
	
	@GetMapping("/activities/{activityId}/category")
	public ResponseEntity<?> findCategory(@PathVariable String activityId) {
		return ok(categoryService.getResourceByActivity(activityId));
	}
	
	@PutMapping("/activities/{activityId}/category")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> updateCategory(@PathVariable String activityId, @RequestBody String categoryId) {
		if (service.existsById(activityId) && categoryService.existsById(categoryId)) {
			service.updateCategory(activityId, categoryService.getById(categoryId));
			return findCategory(activityId);
		} else {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Activity or Category with given ID do not exist!");
		}		
	}
	
	@GetMapping("/activities/{activityId}/organisation")
	public ResponseEntity<?> findOrganisation(@PathVariable String activityId) {
		ProviderEntity provider = providerService.getProvidersByActivity(activityId);
		return ok(organisationService.convertToResource(provider));
	}
	
	@PutMapping("/activities/{activityId}/organisation")
	@OwnActivityPermission
	public ResponseEntity<?> updateOrganisation(@PathVariable String activityId, @RequestBody String organisationId) {
		try {
			service.updateProvider(activityId, getProvider(organisationId));
			return findOrganisation(activityId);
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Given Activity, Organisation or Provider do not exist!");
		}
	}
	
	@GetMapping("/activities/{activityId}/user")
	@ShowUserOrSuperUserPermission
	public ResponseEntity<?> findUser(@PathVariable String activityId) {
		ProviderEntity provider = providerService.getProvidersByActivity(activityId);
		return ok(userService.getResourceByProvider(provider));
	}
	
	@GetMapping("/activities/{activityId}/tags")
	public ResponseEntity<?> findTags(@PathVariable String activityId) {
		return ok(tagService.getResourceByActivity(
				activityId,
				DummyInvocationUtils.methodOn(this.getClass()).findTags(activityId)));
	}
	
	@PostMapping("/activities/{activityId}/tags")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> addTags(@PathVariable String activityId, @RequestBody TagEntity... tags) {
		try {
			service.addTags(activityId, tagService.addAll(Arrays.asList(tags)));
			return findTags(activityId);
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Given Activity does not exist");
		}
	}
	
	@DeleteMapping("/activities/{activityId}/tags/{tagId}")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> deleteTags(@PathVariable String activityId, @PathVariable String... tagIds) {
		try {
			service.deleteTags(activityId, Arrays.asList(tagIds));
			return noContent().build();
		} catch (NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Given Activity does not exist");
		}
	}
	
	@GetMapping("/activities/{activityId}/targetgroups")
	public ResponseEntity<?> findTargetGroups(@PathVariable String activityId) {
		return ok(targetGroupService.getResourceByActivity(
				activityId,
				DummyInvocationUtils.methodOn(this.getClass()).findTargetGroups(activityId)));
	}
	
	@PostMapping("/activities/{activityId}/targetgroups")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> addTargetGroups(@PathVariable String activityId, @RequestBody String... targetGroupIds) {
		try {
			List<String> distinctTargetGroups = Arrays.asList(targetGroupIds).stream().distinct().collect(Collectors.toList());
			service.addTargetGroups(activityId, targetGroupService.getByIds(distinctTargetGroups));
			return findTargetGroups(activityId);
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Given Target Group or Activity do not exist");
		}
	}
	
	@DeleteMapping("/activities/{activityId}/targetgroups/{targetGroupId}")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> deleteTargetGroups(@PathVariable String activityId, @PathVariable String... targetGroupIds) {
		try {
			service.deleteTargetGroup(activityId, Arrays.asList(targetGroupIds));
			return noContent().build();
		} catch (NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Given Activity does not exist");
		}
	}
	
	@GetMapping("/activities/{activityId}/schedules")
	public ResponseEntity<?> findSchedules(@PathVariable String activityId) {
		return ok(scheduleService.getResourceByActivity(
				activityId,
				DummyInvocationUtils.methodOn(this.getClass()).findSchedules(activityId)));
	}
	
	@PostMapping("/activities/{activityId}/schedules")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> addSchedules(@PathVariable String activityId, @RequestBody ScheduleEntity... schedules) {
		try {
			service.addSchedules(activityId, scheduleService.addAll(Arrays.asList(schedules)));
			return findSchedules(activityId);
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Given Activity does not exist");
		}
	}
	
	@DeleteMapping("/activities/{activityId}/schedules/{scheduleId}")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> deleteSchedules(@PathVariable String activityId, @PathVariable String... scheduleIds) {
		try {
			service.deleteSchedule(activityId, Arrays.asList(scheduleIds));
			return noContent().build();
		} catch (NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Given Activity does not exist");
		}
	}
	
	private ProviderEntity getProvider(String organisationId) {
		return providerService.getProviderByUserAndOrganisation(authService.getCurrentUser().getId(), organisationId);
	}
}
