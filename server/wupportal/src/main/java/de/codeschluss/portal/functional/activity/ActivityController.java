package de.codeschluss.portal.functional.activity;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

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

import de.codeschluss.portal.common.base.CrudController;
import de.codeschluss.portal.common.exception.BadParamsException;
import de.codeschluss.portal.common.exception.DuplicateEntryException;
import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.common.security.permissions.OwnOrOrgaActivityOrSuperUserPermission;
import de.codeschluss.portal.common.security.permissions.ProviderOrSuperUserPermission;
import de.codeschluss.portal.common.security.permissions.ShowUserOrSuperUserPermission;
import de.codeschluss.portal.common.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.activity.ActivityEntity;
import de.codeschluss.portal.functional.address.AddressService;
import de.codeschluss.portal.functional.category.CategoryService;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import de.codeschluss.portal.functional.provider.ProviderService;
import de.codeschluss.portal.functional.tag.TagService;
import de.codeschluss.portal.functional.user.UserService;

public class ActivityController extends CrudController<ActivityEntity, ActivityService> {

	private final AddressService addressService;
	private final CategoryService categoryService;
	private final ProviderService providerService;
	private final UserService userService;
	private final TagService tagService;
	
	public ActivityController(ActivityService service,
			AddressService addressService,
			CategoryService categoryService,
			ProviderService providerService,
			UserService userService,
			TagService tagService) {
		super(service);
		this.addressService = addressService;
		this.categoryService = categoryService;
		this.providerService = providerService;
		this.userService = userService;
		this.tagService = tagService;
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
	@ProviderOrSuperUserPermission
	public ResponseEntity<?> add(@RequestBody ActivityEntity newActivity) throws URISyntaxException {
		return super.add(newActivity);
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
	public ResponseEntity<?> updateAddressForActivity(@PathVariable String activityId, @RequestBody String addressId) {
		if (addressService.existsById(addressId) && service.existsById(activityId)) {
			service.updateAddress(activityId, addressService.getById(addressId));
			return ok(findAddressByActivity(activityId));
		} else {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Activity or Address with given ID do not exist!");
		}		
	}
	
	@GetMapping("/activities/{activityId}/category")
	public ResponseEntity<?> findCategoryByActivity(@PathVariable String activityId) {
		return ok(categoryService.getResourceByActivity(activityId));
	}
	
	@PutMapping("/activities/{activityId}/category")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> updateCategoryForActivity(@PathVariable String activityId, @RequestBody String categoryId) {
		if (service.existsById(activityId) && categoryService.existsById(categoryId)) {
			service.updateCategory(activityId, categoryService.getById(categoryId));
			return ok(findCategoryByActivity(activityId));
		} else {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Activity or Category with given ID do not exist!");
		}		
	}
	
	@GetMapping("/activities/{activityId}/user")
	@ShowUserOrSuperUserPermission
	public ResponseEntity<?> findUserByActivity(@PathVariable String activityId) {
		ProviderEntity provider = providerService.getProvidersByActivity(activityId);
		return ok(userService.getResourceByProvider(provider));
	}
	
	@GetMapping("/activities/{activityId}/tags")
	public ResponseEntity<?> findTagsByActivity(@PathVariable String activityId) {
		return ok(tagService.getResourceByActivity(
				activityId,
				DummyInvocationUtils.methodOn(this.getClass()).findTagsByActivity(activityId)));
	}
	
	@PostMapping("/activities/{activityId}/tags")
	public ResponseEntity<?> addTagsByActivity(@PathVariable String activityId, @RequestBody String... tagId) {
		List<String> distinctTags = Arrays.asList(tagId).stream().distinct().collect(Collectors.toList());
		
		if (service.isTagDuplicate(activityId, distinctTags)) {
			//TODO: Error Objects with proper message
			throw new DuplicateEntryException("Activity with one or more Tags already exists");
		}
		service.addTags(activityId, tagService.getByIds(Arrays.asList(tagId)));
		return ok(findTagsByActivity(activityId));
		
	}
	
	@DeleteMapping("/activities/{activityId}/tags/{tagId}")
	@OwnOrOrgaActivityOrSuperUserPermission
	public ResponseEntity<?> deleteTagByActivity(@PathVariable String activityId, @PathVariable String tagId) {
		try {
			service.deleteTag(activityId, tagId);
			return noContent().build();
		} catch (NotFoundException e) {
			return noContent().build();
		}
	}
}
