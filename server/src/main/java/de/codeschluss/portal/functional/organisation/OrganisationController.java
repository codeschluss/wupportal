package de.codeschluss.portal.functional.organisation;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import java.net.URISyntaxException;
import java.util.List;

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
import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.common.security.permissions.OrgaAdminOrSuperUserPermission;
import de.codeschluss.portal.common.security.permissions.SuperUserPermission;
import de.codeschluss.portal.common.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.activity.ActivityService;
import de.codeschluss.portal.functional.address.AddressService;
import de.codeschluss.portal.functional.provider.ProviderEntity;
import de.codeschluss.portal.functional.provider.ProviderService;
import de.codeschluss.portal.functional.user.UserService;

@RestController
public class OrganisationController extends CrudController<OrganisationEntity, OrganisationService> {

	private final ProviderService providerService;
	private final UserService userService;
	private final AddressService addressService;
	private final ActivityService activityService;
	
	public OrganisationController(OrganisationService service,
			ProviderService providerService,
			UserService userService,
			AddressService addressService,
			ActivityService activityService) {
		super(service);
		this.providerService = providerService;
		this.userService = userService;
		this.addressService = addressService;
		this.activityService = activityService;
	}
	
	@Override
	@GetMapping("/organisations")
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@Override
	@GetMapping("/organisations/{organisationId}")
	public Resource<OrganisationEntity> findOne(@PathVariable String organisationId) {
		return super.findOne(organisationId);
	}
	
	@Override
	@PostMapping("/organisations")
	@SuperUserPermission
	public ResponseEntity<?> add(@RequestBody OrganisationEntity newOrga) throws URISyntaxException {
		return super.add(newOrga);
	}
	
	@Override
	@PutMapping("/organisations/{organisationId}")
	@OrgaAdminOrSuperUserPermission
	public ResponseEntity<?> update(@RequestBody OrganisationEntity newOrga, @PathVariable String organisationId) throws URISyntaxException {
		return super.update(newOrga, organisationId);
	}
	
	@Override
	@DeleteMapping("/organisations/{organisationId}")
	@OrgaAdminOrSuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String organisationId) {
		return super.delete(organisationId);
	}
	
	@GetMapping("/organisations/{organisationId}/address")
	public ResponseEntity<?> findAddressByOrganisation(@PathVariable String organisationId) {
		return ok(addressService.getResourcesWithSuburbsByOrganisation(organisationId));
	}
	
	@PutMapping("/organisations/{organisationId}/address")
	@OrgaAdminOrSuperUserPermission
	public ResponseEntity<?> updateAddressForOrganisation(@PathVariable String organisationId, @RequestBody String addressId) {
		if (addressService.existsById(addressId) && service.existsById(organisationId)) {
			service.updateAddress(organisationId, addressService.getById(addressId));
			return ok(findAddressByOrganisation(organisationId));
		} else {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Organisation or Address with given ID do not exist!");
		}		
	}
	
	@GetMapping("/organisations/{organisationId}/activities")
	public ResponseEntity<?> findActivitiesByOrganisation(@PathVariable String organisationId) {
		List<ProviderEntity> providers = providerService.getProvidersByOrganisation(organisationId);
		return ok(activityService.getResourcesByProviders(
				providers,
				DummyInvocationUtils.methodOn(this.getClass()).findActivitiesByOrganisation(organisationId)));
	}
	
	@DeleteMapping("/organisations/{organisationId}/activities/{activityId}")
	@OrgaAdminOrSuperUserPermission
	public ResponseEntity<?> deleteActivityForOrganisation(@PathVariable String organisationId, @PathVariable String activityId) {
		if (activityService.isActivityForProvider(activityId, providerService.getProvidersByOrganisation(organisationId))) {
			activityService.delete(activityId);
			return noContent().build();
		} else {
			throw new BadParamsException("Activity does not match given organisation!");
		}
	}
	
	@GetMapping("/organisations/{organisationId}/users")
	@OrgaAdminOrSuperUserPermission	
	public ResponseEntity<?> findUsersByOrganisation(@PathVariable String organisationId) {
		List<ProviderEntity> providers = providerService.getProvidersByOrganisation(organisationId);
		return ok(userService.convertToResourcesWithProviders(
				providers,
				DummyInvocationUtils.methodOn(this.getClass()).findUsersByOrganisation(organisationId)));
	}
	
	@PutMapping("/organisations/{organisationId}/users/{userId}/approve")
	@OrgaAdminOrSuperUserPermission	
	public ResponseEntity<?> approveOrRejectUserForOrganisation(@PathVariable String organisationId, @PathVariable String userId, @RequestBody Boolean isApproved) {
		try {
			this.providerService.setApprovedByUserAndOrga(userId, organisationId, isApproved);
			return noContent().build();
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("User with given ID does not exist in given Organisation!");
		}
	}
	
	@PutMapping("/organisations/{organisationId}/users/{userId}/admin")
	@OrgaAdminOrSuperUserPermission	
	public ResponseEntity<?> grantAdminRightForOrganisation(@PathVariable String organisationId, @PathVariable String userId, @RequestBody Boolean isAdmin) {
		try {
			this.providerService.setAdminByUserAndOrga(userId, organisationId, isAdmin);			
			return noContent().build();
		} catch(NotFoundException e) {
			//TODO: Error Objects with proper message
			throw new BadParamsException("User with given ID does not exist in given Organisation!");
		}
	}
	
	@DeleteMapping("/organisations/{organisationId}/users/{userId}")
	@OrgaAdminOrSuperUserPermission
	public ResponseEntity<?> deleteUserForOrganisation(@PathVariable String organisationId, @PathVariable String userId) {
		try {
			providerService.deleteForUserAndOrga(userId, organisationId);
			return noContent().build();
		} catch (NotFoundException e) {
			return noContent().build();
		}
	}
}
