package de.codeschluss.portal.functional.address;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.base.ResourceWithEmbeddable;
import de.codeschluss.portal.common.exception.NotFoundException;

@Service
public class AddressService extends DataService<AddressEntity>{

	public AddressService(AddressRepository repo,
			AddressResourceAssembler assembler) {
		super(repo, assembler);
	}
	
	public AddressEntity update(String id, AddressEntity newAddress) {
		return getRepo().findById(id).map(address -> {
			address.setHouseNumber(newAddress.getHouseNumber());
			address.setLatitude(newAddress.getLatitude());
			address.setLongitude(newAddress.getLongitude());
			address.setPlace(newAddress.getPlace());
			address.setPostalCode(newAddress.getPostalCode());
			address.setStreet(newAddress.getStreet());
			return getRepo().save(address);
		}).orElseGet(() -> {
			newAddress.setId(id);
			return getRepo().save(newAddress);
		});
	}
	
	public Resources<?> getResourcesWithProvidersByOrganisation(String orgaId, ResponseEntity<?> responseEntity) {
		List<AddressEntity> addresses = getRepo().findByOrganisationsId(orgaId).orElseThrow(() -> new NotFoundException(orgaId));
		
		List<ResourceWithEmbeddable<AddressEntity>> result = addresses.stream().map(address -> {
			return assembler.toResourceWithEmbedabble(address, address.getSuburb(), "suburb");
		}).collect(Collectors.toList());
		
		return assembler.toListResources(result, responseEntity);
	}
	
	public AddressRepository getRepo() {
		if (repo instanceof AddressRepository) {
			return (AddressRepository) repo;
		} else {
			throw new RuntimeException("repository is type of " + repo.getClass().getName() + " instead of " + AddressRepository.class.getName());
		}
	}
	
}
