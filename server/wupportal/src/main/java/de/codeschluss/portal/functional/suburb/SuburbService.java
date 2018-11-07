package de.codeschluss.portal.functional.suburb;

import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;

@Service
public class SuburbService extends DataService<SuburbEntity> {

	public SuburbService(SuburbRepository repo,
			SuburbResourceAssembler assembler) {
		super(repo, assembler);
	}
	
	public Resource<SuburbEntity> getResourceByAddress(String addressId) {
		SuburbEntity suburb = getRepo().findByAddressesId(addressId).orElseThrow(() -> new NotFoundException(addressId));
		return assembler.toResource(suburb);
	}
	
	public SuburbRepository getRepo() {
		if (repo instanceof SuburbRepository) {
			return (SuburbRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + SuburbRepository.class.getName());
		}
	}

}
