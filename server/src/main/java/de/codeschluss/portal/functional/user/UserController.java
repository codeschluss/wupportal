package de.codeschluss.portal.functional.user;

import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

import static org.springframework.http.ResponseEntity.*;

import de.codeschluss.portal.core.common.CrudController;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.security.permissions.OwnUserOrSuperUserPermission;
import de.codeschluss.portal.core.security.permissions.OwnUserPermission;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;
import de.codeschluss.portal.core.utils.FilterSortPaginate;
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
	@OwnUserOrSuperUserPermission
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
	@OwnUserOrSuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String userId) {
		return super.delete(userId);
	}
	
	@PutMapping("/users/{userId}/superuser")
	@SuperUserPermission
	public ResponseEntity<?> grantSuperuserRight(@PathVariable String userId, @RequestBody Boolean isSuperuser) {
		try {
			service.grantSuperUser(userId, isSuperuser);
			return noContent().build();
		} catch(NotFoundException e) {
			throw new BadParamsException("User with given ID does not exist!");
		}
	}
	
	@GetMapping("/users/{userId}/organisations")
	@OwnUserOrSuperUserPermission
	public ResponseEntity<?> findOrganisations(@PathVariable String userId) {
		List<ProviderEntity> providers = providerService.getProvidersByUser(userId);
		return ok(organisationService.convertToResourcesWithProviders(providers));
	}
	
	@PostMapping("/users/{userId}/organisations")
	@OwnUserOrSuperUserPermission
	public ResponseEntity<?> addOrganisation(@PathVariable String userId, @RequestBody String... organisationParam) {
		List<String> distinctOrgas = Arrays.asList(organisationParam).stream().distinct().collect(Collectors.toList());
		
		if (providerService.isDuplicate(userId, distinctOrgas)) {
			throw new DuplicateEntryException("User with one or more Organisations already exists");
		}
		
		try {
			List<ProviderEntity> providers = providerService.addAll(providerService.createProviders(service.getById(userId), distinctOrgas));
			return ok(organisationService.convertToResourcesWithProviders(providers));
		} catch (NotFoundException | NullPointerException e) {
			throw new BadParamsException("User or Organisation are null or do not exist!");
		}
	}
	
	@DeleteMapping("/users/{userId}/organisations/{orgaId}")
	@OwnUserOrSuperUserPermission
	public ResponseEntity<?> deleteOrganisation(@PathVariable String userId, @PathVariable String orgaId) {
		try {
			providerService.deleteForUserAndOrga(userId, orgaId);
		} catch (NotFoundException e) {}
		
		return noContent().build();
	}
	
	@GetMapping("/users/{userId}/activities")
	//TODO: Visible for all?
	public ResponseEntity<?> findActivities(@PathVariable String userId) {		
		List<ProviderEntity> providers = providerService.getProvidersByUser(userId);
		return ok(activityService.getResourcesByProviders(providers));
	}
	
	@DeleteMapping("/users/{userId}/activities/{activityId}")
	@OwnUserOrSuperUserPermission
	public ResponseEntity<?> deleteActivity(@PathVariable String userId, @PathVariable String activityId) {
		if (activityService.isActivityForProvider(activityId, providerService.getProvidersByUser(userId))) {
			activityService.delete(activityId);
			return noContent().build();
		} else {
			throw new BadParamsException("Activity does not match given user!");
		}
	}
	
	@PutMapping("/users/resetpassword")
	public ResponseEntity<?> resetPassword(@RequestBody String username) throws MessagingException {
		if (service.resetPassword(username)) {
			return noContent().build();
		} else {
			throw new BadParamsException("Password is not reset. User does not exist or Mail is mistyped");
		}
	}
}
