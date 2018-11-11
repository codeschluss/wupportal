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
import de.codeschluss.portal.functional.schedule.ScheduleService;
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
	public ResponseEntity<?> findAddressByActivity(@PathVariable String activityId) {
		return ok(addressService.getResourcesWithSuburbsByActivity(activityId));
	}
	
	@PutMapping("/activities/{activityId}/address")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> updateAddress(@PathVariable String activityId, @RequestBody String addressId) {
		if (addressService.existsById(addressId) && service.existsById(activityId)) {
			service.updateAddress(activityId, addressService.getById(addressId));
			return ok(findAddressByActivity(activityId));
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
			return ok(findCategory(activityId));
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
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> updateOrganisation(@PathVariable String activityId, @RequestBody String organisationId) {
		if (service.existsById(activityId) && organisationService.existsById(organisationId)) {
			service.updateProvider(activityId, getProvider(organisationId));
			return ok(findCategory(activityId));
		} else {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Activity or Organisation with given ID do not exist!");
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
	public ResponseEntity<?> addTags(@PathVariable String activityId, @RequestBody String... tagId) {
		List<String> distinctTags = Arrays.asList(tagId).stream().distinct().collect(Collectors.toList());
		
		if (service.isTagDuplicate(activityId, distinctTags)) {
			//TODO: Error Objects with proper message
			throw new DuplicateEntryException("Activity with one or more Tags already exists");
		}
		service.addTags(activityId, tagService.getByIds(Arrays.asList(tagId)));
		return ok(findTags(activityId));
	}
	
	@DeleteMapping("/activities/{activityId}/tags/{tagId}")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> deleteTag(@PathVariable String activityId, @PathVariable String tagId) {
		try {
			service.deleteTag(activityId, tagId);
			return noContent().build();
		} catch (NotFoundException e) {
			return noContent().build();
		}
	}
	
	@GetMapping("/activities/{activityId}/targetgroups")
	public ResponseEntity<?> findTargetGroups(@PathVariable String activityId) {
		return ok(targetGroupService.getResourceByActivity(
				activityId,
				DummyInvocationUtils.methodOn(this.getClass()).findTags(activityId)));
	}
	
	@PostMapping("/activities/{activityId}/targetgroups")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> addTargetGroups(@PathVariable String activityId, @RequestBody String... targetGroupId) {
		List<String> distinctTargetGroups = Arrays.asList(targetGroupId).stream().distinct().collect(Collectors.toList());
		
		if (service.isTargetGroupDuplicate(activityId, distinctTargetGroups)) {
			//TODO: Error Objects with proper message
			throw new DuplicateEntryException("Activity with one or more Target Group already exists");
		}
		service.addTargetGroups(activityId, targetGroupService.getByIds(Arrays.asList(targetGroupId)));
		return ok(findTags(activityId));
	}
	
	@DeleteMapping("/activities/{activityId}/targetgroups/{targetGroupId}")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> deleteTargetGroup(@PathVariable String activityId, @PathVariable String targetGroupId) {
		try {
			service.deleteTargetGroup(activityId, targetGroupId);
			return noContent().build();
		} catch (NotFoundException e) {
			return noContent().build();
		}
	}
	
	@GetMapping("/activities/{activityId}/schedules")
	public ResponseEntity<?> findSchedules(@PathVariable String activityId) {
		return ok(scheduleService.getResourceByActivity(
				activityId,
				DummyInvocationUtils.methodOn(this.getClass()).findTags(activityId)));
	}
	
	@PostMapping("/activities/{activityId}/schedules")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> addSchedules(@PathVariable String activityId, @RequestBody String... scheduleId) {
		List<String> distinctSchedules = Arrays.asList(scheduleId).stream().distinct().collect(Collectors.toList());
		
		if (service.isScheduleDuplicate(activityId, distinctSchedules)) {
			//TODO: Error Objects with proper message
			throw new DuplicateEntryException("Activity with one or more Schedules already exists");
		}
		service.addSchedules(activityId, scheduleService.getByIds(Arrays.asList(scheduleId)));
		return ok(findTags(activityId));
	}
	
	@DeleteMapping("/activities/{activityId}/schedules/{scheduleId}")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> deleteSchedule(@PathVariable String activityId, @PathVariable String scheduleId) {
		try {
			service.deleteSchedule(activityId, scheduleId);
			return noContent().build();
		} catch (NotFoundException e) {
			return noContent().build();
		}
	}
	
	private ProviderEntity getProvider(String organisationId) {
		return providerService.getProviderByUserAndOrganisation(authService.getCurrentUser().getId(), organisationId);
	}
}
