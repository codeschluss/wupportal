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
import de.codeschluss.wupportal.organisation.OrganisationService;
import de.codeschluss.wupportal.provider.ProviderEntity;
import de.codeschluss.wupportal.provider.ProviderService;
import de.codeschluss.wupportal.security.permissions.OwnOrSuperUserPermission;
import de.codeschluss.wupportal.security.permissions.OwnUserPermission;
import de.codeschluss.wupportal.security.permissions.SuperUserPermission;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

@RestController
public class UserController extends CrudController<UserEntity, PagingAndSortingAssembler<UserEntity>, UserService>{

	private final ProviderService providerService;
	private final ActivityService activityService;
	private final OrganisationService organisationService;
	
	protected final String DEFAULT_SORT_PROP = "username";

	public UserController(UserService userService,
			ProviderService providerService,
			UserResourceAssembler userAssembler,
			ActivityService activityService,
			OrganisationService organisationService) {
		super(userService, userAssembler);
		this.providerService = providerService;
		this.activityService = activityService;
		this.organisationService = organisationService;
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
	public ResponseEntity<?> grantSuperuserRight(@PathVariable String userId, @RequestBody boolean isSuperuser) {
		try {
			this.service.grantSuperUser(userId, isSuperuser);
			return super.respondNoContent();
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("User with given ID does not exist!");
		}
	}
	
	@PostMapping("/users/{userId}/organisations")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> addOrganisationforUser(@PathVariable String userId, @RequestBody String... organisation) {
		try {
			List<ProviderEntity> providers = providerService.addAll(providerService.createProviders(service.getById(userId), organisation));
			return ResponseEntity.ok(
					assembler.toListSubResource(
						organisationService.getOrganisationsByProviders(providers),
						DummyInvocationUtils.methodOn(this.getClass()).findOrganisationsByUser(userId, null)));
		} catch (NotFoundException | NullPointerException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("User or Organisation are null or do not exist!");
		}
	}
	
	@GetMapping("/users/{userId}/organisations")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> findOrganisationsByUser(@PathVariable String userId, FilterSortPaginate params) {
		validateRequest(params);
		
		List<ProviderEntity> providers = providerService.getProvidersByUser(service.getById(userId), null);
		
		Sort sort = params.createSort("id");
		if (params.getPage() == null && params.getSize() == null) {
			return ResponseEntity.ok(
					assembler.toListSubResource(
							organisationService.getOrganisationsByProviders(providers,sort),
							DummyInvocationUtils.methodOn(this.getClass()).findOrganisationsByUser(userId, params)));
		}
		
		PageRequest pageRequest = PageRequest.of(params.getPage(), params.getSize(), sort);
		return ResponseEntity.ok(
				assembler.toPagedSubResource(params,
						organisationService.getPagedOrganisationsByProviders(providers, pageRequest)));
	}
	
	@DeleteMapping("/users/{userId}/organisations/{orgaId}")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> deleteOrganisationForUser(@PathVariable String userId, @PathVariable String orgaId) {
		try {
			providerService.deleteForUserAndOrga(userId, orgaId);
			return super.respondNoContent();
		} catch (NotFoundException e) {
			return super.respondNoContent();
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
							activityService.getActivitiesByProviders(providers, sort),
							DummyInvocationUtils.methodOn(this.getClass()).findActivitiesByUser(userId, params)));
		}
		
		PageRequest pageRequest = PageRequest.of(params.getPage(), params.getSize(), sort);
		return ResponseEntity.ok(
				assembler.toPagedSubResource(params,
						activityService.getPagedActivitiesByProviders(pageRequest, providers)));
	}
	
	@DeleteMapping("/users/{userId}/activities/{activityId}")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> deleteActivityForUser(@PathVariable String userId, @PathVariable String activityId) {
		if (activityService.isActivityForProvider(activityId, providerService.getProvidersByUser(userId))) {
			activityService.delete(activityId);
			return respondNoContent();
		} else {
			throw new BadParamsException("Activity does not match given user!");
		}
	}
	
}
