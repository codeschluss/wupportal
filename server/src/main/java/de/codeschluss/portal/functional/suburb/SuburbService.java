package de.codeschluss.portal.functional.suburb;

import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.functional.suburb.SuburbEntity;

@Service
public class SuburbService extends DataService<SuburbEntity, SuburbRepository> {

	public SuburbService(SuburbRepository repo,
			SuburbResourceAssembler assembler) {
		super(repo, assembler);
	}
	
	public SuburbEntity getExisting(SuburbEntity suburb) {
		return repo.findByName(suburb.getName()).orElse(null);
	}
	
	public Resource<SuburbEntity> getResourceByAddress(String addressId) {
		SuburbEntity suburb = repo.findByAddressesId(addressId).orElseThrow(() -> new NotFoundException(addressId));
		return assembler.toResource(suburb);
	}
	
	public SuburbEntity update(String id, SuburbEntity newSuburb) {
		return repo.findById(id).map(suburb -> {
			suburb.setName(newSuburb.getName());
			return repo.save(suburb);
		}).orElseGet(() -> {
			newSuburb.setId(id);
			return repo.save(newSuburb);
		});
	}
}
