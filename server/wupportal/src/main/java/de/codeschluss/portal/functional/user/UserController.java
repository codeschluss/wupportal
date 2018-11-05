package de.codeschluss.portal.functional.user;

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

import static org.springframework.http.ResponseEntity.*;

import de.codeschluss.portal.common.base.CrudController;
import de.codeschluss.portal.common.exception.BadParamsException;
import de.codeschluss.portal.common.exception.DuplicateEntryException;
import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.common.security.permissions.OwnOrSuperUserPermission;
import de.codeschluss.portal.common.security.permissions.OwnUserPermission;
import de.codeschluss.portal.common.security.permissions.SuperUserPermission;
import de.codeschluss.portal.common.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.activity.ActivityService;
import de.codeschluss.portal.functional.organisation.OrganisationService;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import de.codeschluss.portal.functional.provider.ProviderService;

@RestController
public class UserController extends CrudController<UserEntity, UserService>{

	private final ProviderService providerService;
	private final ActivityService activityService;
	private final OrganisationService organisationService;

	public UserController(UserService userService,
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
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@Override
	@GetMapping("/users/{userId}")
	@OwnOrSuperUserPermission
	public Resource<UserEntity> findOne(@PathVariable String userId) {
		return super.findOne(userId);
	}
	
	@Override
	@PostMapping("/users")
	public ResponseEntity<?> add(@RequestBody UserEntity newUser) throws URISyntaxException {
		return super.add(newUser);
	}
	
	@Override
	@PutMapping("/users/{userId}")
	@OwnUserPermission
	public ResponseEntity<?> update(@RequestBody UserEntity newUser, @PathVariable String userId) throws URISyntaxException {
		return super.update(newUser, userId);
	}
	
	@Override
	@DeleteMapping("/users/{userId}")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String userId) {
		return super.delete(userId);
	}
	
	@PutMapping("/users/{userId}/superuser")
	@SuperUserPermission
	public ResponseEntity<?> grantSuperuserRight(@PathVariable String userId, @RequestBody Boolean isSuperuser) {
		try {
			this.service.grantSuperUser(userId, isSuperuser);
			return noContent().build();
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("User with given ID does not exist!");
		}
	}
	
	@GetMapping("/users/{userId}/organisations")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> findOrganisationsByUser(@PathVariable String userId) {
		List<ProviderEntity> providers = providerService.getProvidersByUser(userId);
		return ok(organisationService.convertToResourcesWithProviders(
				providers,
				DummyInvocationUtils.methodOn(this.getClass()).findOrganisationsByUser(userId)));
	}
	
	@PostMapping("/users/{userId}/organisations")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> addOrganisationforUser(@PathVariable String userId, @RequestBody String... organisationParam) {
		List<String> distinctOrgas = Arrays.asList(organisationParam).stream().distinct().collect(Collectors.toList());
		
		if (providerService.isDuplicate(userId, distinctOrgas)) {
			//TODO: Error Objects with proper message
			throw new DuplicateEntryException("User with given one or more Organisations already exists");
		}
		
		try {
			List<ProviderEntity> providers = providerService.addAll(providerService.createProviders(service.getById(userId), distinctOrgas));
			return ok(organisationService.convertToResourcesWithProviders(
					providers,
					DummyInvocationUtils.methodOn(this.getClass()).findOrganisationsByUser(userId)));
		} catch (NotFoundException | NullPointerException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("User or Organisation are null or do not exist!");
		}
	}
	
	@DeleteMapping("/users/{userId}/organisations/{orgaId}")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> deleteOrganisationForUser(@PathVariable String userId, @PathVariable String orgaId) {
		try {
			providerService.deleteForUserAndOrga(userId, orgaId);
			return noContent().build();
		} catch (NotFoundException e) {
			return noContent().build();
		}
	}
	
	@GetMapping("/users/{userId}/activities")
	//TODO: Visible for all?
	public ResponseEntity<?> findActivitiesByUser(@PathVariable String userId) {		
		List<ProviderEntity> providers = providerService.getProvidersByUser(userId);
		return ok(activityService.getResourcesByProviders(
				providers,
				DummyInvocationUtils.methodOn(this.getClass()).findActivitiesByUser(userId)));
	}
	
	@DeleteMapping("/users/{userId}/activities/{activityId}")
	@OwnOrSuperUserPermission
	public ResponseEntity<?> deleteActivityForUser(@PathVariable String userId, @PathVariable String activityId) {
		if (activityService.isActivityForProvider(activityId, providerService.getProvidersByUser(userId))) {
			activityService.delete(activityId);
			return noContent().build();
		} else {
			throw new BadParamsException("Activity does not match given user!");
		}
	}
	
	@Override
	protected void checkForDuplicates(UserEntity user) {
		if (service.userExists(user.getUsername())) {
			//TODO: Error Objects with proper message
			throw new DuplicateEntryException("Username already exists!");
		}
	}
	
}
