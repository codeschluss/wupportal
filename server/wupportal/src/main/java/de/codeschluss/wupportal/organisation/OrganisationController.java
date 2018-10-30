package de.codeschluss.wupportal.organisation;

import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import de.codeschluss.wupportal.base.CrudController;
import de.codeschluss.wupportal.base.PagingAndSortingAssembler;
import de.codeschluss.wupportal.exception.DuplicateEntryException;
import de.codeschluss.wupportal.security.permissions.OrgaAdminOrSuperUserPermission;
import de.codeschluss.wupportal.security.permissions.SuperUserPermission;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

public class OrganisationController extends CrudController<OrganisationEntity, PagingAndSortingAssembler<OrganisationEntity>, OrganisationService> {

	public OrganisationController(OrganisationService service,
			OrganisationResourceAssembler assembler) {
		super(service, assembler);
	}
	
	@GetMapping("/organisations")
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@GetMapping("/organisations/{organisationId}")
	public Resource<OrganisationEntity> findOne(@PathVariable String organisationId) {
		return super.findOne(organisationId);
	}
	
	@PostMapping("/organisations")
	@SuperUserPermission
	public ResponseEntity<?> add(@RequestBody OrganisationEntity newOrga) throws URISyntaxException {
		if (service.organisationExists(newOrga.getName())) {
			//TODO: Error Objects with proper message
			throw new DuplicateEntryException("Organisation name already exists!");
		}
		return super.add(newOrga);
	}
	
	@PutMapping("/organisations/{organisationId}")
	@OrgaAdminOrSuperUserPermission
	public ResponseEntity<?> update(@RequestBody OrganisationEntity newOrga, @PathVariable String organisationId) throws URISyntaxException {
		return super.update(newOrga, organisationId);
	}
	
	@DeleteMapping("/organisations/{organisationId}")
	@OrgaAdminOrSuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String orgaId) {
		return super.delete(orgaId);
	}
	
//	@GetMapping("/organisations/{organisationId}/users")
//	@OrgaAdminOrSuperUserPermission
//	public ResponseEntity<?> findUsersByOrganisation(@PathVariable String organisationId, FilterSortPaginate params) {
//		validateRequest(params);
//		
//		List<UserEntity> orgaUsers = providerService.getProvidersByUser(service.getById(userId), null);
//		
//		Sort sort = params.createSort("id");
//		if (params.getPage() == null && params.getSize() == null) {
//			return ResponseEntity.ok(
//					assembler.toListSubResource(
//							activityService.getActivitiesByProviders(providers, sort),
//							DummyInvocationUtils.methodOn(this.getClass()).findActivitiesByUser(userId, params)));
//		}
//		
//		PageRequest pageRequest = PageRequest.of(params.getPage(), params.getSize(), sort);
//		return ResponseEntity.ok(
//				assembler.toPagedSubResource(params,
//						activityService.getPagedActivitiesByProviders(pageRequest, providers)));
//	}

}
