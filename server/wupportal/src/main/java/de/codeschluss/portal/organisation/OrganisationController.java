package de.codeschluss.portal.organisation;

import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import de.codeschluss.portal.base.CrudController;
import de.codeschluss.portal.exception.DuplicateEntryException;
import de.codeschluss.portal.security.permissions.OrgaAdminOrSuperUserPermission;
import de.codeschluss.portal.security.permissions.SuperUserPermission;
import de.codeschluss.portal.utils.FilterSortPaginate;

public class OrganisationController extends CrudController<OrganisationEntity, OrganisationService> {

	public OrganisationController(OrganisationService service) {
		super(service);
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

}
