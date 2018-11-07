package de.codeschluss.portal.functional.suburb;

import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;

@Service
public class SuburbService extends DataService<SuburbEntity, SuburbRepository> {

	public SuburbService(SuburbRepository repo,
			SuburbResourceAssembler assembler) {
		super(repo, assembler);
	}
	
	public Resource<SuburbEntity> getResourceByAddress(String addressId) {
		SuburbEntity suburb = repo.findByAddressesId(addressId).orElseThrow(() -> new NotFoundException(addressId));
		return assembler.toResource(suburb);
	}
}
