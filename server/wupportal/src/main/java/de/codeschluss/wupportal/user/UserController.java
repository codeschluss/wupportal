package de.codeschluss.wupportal.user;

import java.net.URISyntaxException;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

import de.codeschluss.wupportal.activity.ActivityService;
import de.codeschluss.wupportal.base.CrudController;
import de.codeschluss.wupportal.base.PagingAndSortingAssembler;
import de.codeschluss.wupportal.exception.BadParamsException;
import de.codeschluss.wupportal.exception.DuplicateEntryException;
import de.codeschluss.wupportal.exception.NotFoundException;
import de.codeschluss.wupportal.provider.ProviderEntity;
import de.codeschluss.wupportal.provider.ProviderService;
import de.codeschluss.wupportal.provider.ProviderTO;
import de.codeschluss.wupportal.security.permissions.OwnOrSuperUserPermission;
import de.codeschluss.wupportal.security.permissions.OwnUserPermission;
import de.codeschluss.wupportal.security.permissions.SuperUserPermission;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

@RestController
public class UserController extends CrudController<UserEntity, PagingAndSortingAssembler<UserEntity>, UserService>{

	private final ProviderService providerService;
	private final ActivityService activityService;
	
	protected final String DEFAULT_SORT_PROP = "username";

	public UserController(UserService userService,
			ProviderService providerService,
			UserResourceAssembler userAssembler,
			ActivityService activityService) {
		super(userService, userAssembler);
		this.providerService = providerService;
		this.activityService = activityService;
	}
	
	@GetMapping("/users")
	@SuperUserPermission
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@GetMapping("/users/{userId}")
	@OwnOrSuperUserPermission
	public Resource<UserEntity> findOne(@PathVariable String userId) {
		return super.findOne(userId);
	}
	
	@PostMapping("/users")
	public ResponseEntity<?> add(@RequestBody UserEntity newUser) throws URISyntaxException {
		if (service.userExists(newUser.getUsername())) {
			//TODO: Error Objects with proper message
			throw new DuplicateEntryException("Username already exists!");
		}
		return super.add(newUser);
	}
	
	@PutMapping("/users/{userId}")
	@OwnUserPermission
	public ResponseEntity<?> update(@RequestBody UserEntity newUser, @PathVariable String userId) throws URISyntaxException {
		return super.update(newUser, userId);
	}
	
	@DeleteMapping("/users/{userId}")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String userId) {
		return super.delete(userId);
	}
	
	@PutMapping("/users/{userId}/superuser")
	@SuperUserPermission
	public ResponseEntity<?> grantSuperuser(@PathVariable String userId, @RequestBody boolean isSuperuser) {
		try {
			this.service.grantSuperUser(userId, isSuperuser);
			return ResponseEntity.noContent().build();
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("User with given ID does not exist!");
		}
	}
	
	@PostMapping("/users/{userId}/providers")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> addProvidersforUser(@PathVariable String userId, ProviderTO... providerTOs) {
		try {
			List<ProviderEntity> providers = providerService.mapForUser(providerTOs, service.getById(userId));
			
			return ResponseEntity.ok(
					assembler.toListSubResource(
						providerService.addAll(providers),
						DummyInvocationUtils.methodOn(this.getClass()).findProvidersByUser(userId, null)));
		} catch (NotFoundException | NullPointerException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("User or Organisation are null or do not exist!");
		}
	}
	
	@GetMapping("/users/{userId}/providers")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> findProvidersByUser(@PathVariable String userId, FilterSortPaginate params) {
		validateRequest(params);
		
		Sort sort = params.createSort("id");
		if (params.getPage() == null && params.getSize() == null) {
			return ResponseEntity.ok(
					assembler.toListSubResource(
							providerService.getProvidersByUser(service.getById(userId), sort),
							DummyInvocationUtils.methodOn(this.getClass()).findProvidersByUser(userId, params)));
		}
		
		PageRequest pageRequest = PageRequest.of(params.getPage(), params.getSize(), sort);
		return ResponseEntity.ok(
				assembler.toPagedSubResource(params,
						providerService.getPagedProvidersByUser(service.getById(userId), pageRequest)));
	}
	
	@DeleteMapping("/users/{userId}/providers/{providerId}")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> deleteProviderForUser(@PathVariable String userId, @PathVariable String providerId) {
		if (providerService.isProviderForUser(userId, providerId)) {
			providerService.delete(providerId);
			return ResponseEntity.noContent().build();
		} else {
			throw new BadParamsException("Provider does not match given user!");
		}
	}
	
	@GetMapping("/users/{userId}/activities")
	//TODO: Visible for all?
	public ResponseEntity<?> findActivitiesByUser(@PathVariable String userId, FilterSortPaginate params) {
		validateRequest(params);
		
		List<ProviderEntity> providers = providerService.getProvidersByUser(service.getById(userId), null);
		
		Sort sort = params.createSort("id");
		if (params.getPage() == null && params.getSize() == null) {
			return ResponseEntity.ok(
					assembler.toListSubResource(
							activityService.getActivitiesByProviders(sort, providers),
							DummyInvocationUtils.methodOn(this.getClass()).findProvidersByUser(userId, params)));
		}
		
		PageRequest pageRequest = PageRequest.of(params.getPage(), params.getSize(), sort);
		return ResponseEntity.ok(
				assembler.toPagedSubResource(params,
						activityService.getPagedActivitiesByProviders(pageRequest, providers)));
	}
	
	@DeleteMapping("/users/{userId}/activities/{activityId}")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> deleteActivityForUser(@PathVariable String userId, @PathVariable String activityId) {
		if (activityService.isActivityForProvider(activityId, providerService.getProvidersByUser(userId, null))) {
			activityService.delete(activityId);
			return ResponseEntity.noContent().build();
		} else {
			throw new BadParamsException("Activity does not match given user!");
		}
	}
	
}
