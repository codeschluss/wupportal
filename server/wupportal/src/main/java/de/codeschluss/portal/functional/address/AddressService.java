package de.codeschluss.portal.functional.address;

import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.suburb.SuburbEntity;

@Service
public class AddressService extends DataService<AddressEntity, AddressRepository> {

	public AddressService(AddressRepository repo,
			AddressResourceAssembler assembler) {
		super(repo, assembler);
	}
	
	public AddressEntity getDuplicate(AddressEntity address) {
		return repo.findByHouseNumberAndPlaceAndPostalCodeAndStreet(
				address.getHouseNumber(), 
				address.getPlace(),
				address.getPostalCode(),
				address.getStreet()).orElse(null);
	}
	
	public Resource<?> getResourcesWithSuburbsByOrganisation(String orgaId) {
		AddressEntity address = repo.findByOrganisationsId(orgaId).orElseThrow(() -> new NotFoundException(orgaId));
		return assembler.toResourceWithEmbedabble(address, address.getSuburb(), "suburb");
	}
	
	public Resource<?> getResourcesWithSuburbsByActivity(String activityId) {
		AddressEntity address = repo.findByActivitiesId(activityId).orElseThrow(() -> new NotFoundException(activityId));
		return assembler.toResourceWithEmbedabble(address, address.getSuburb(), "suburb");
	}
	
	public AddressEntity update(String id, AddressEntity newAddress) {
		return repo.findById(id).map(address -> {
			address.setHouseNumber(newAddress.getHouseNumber());
			address.setLatitude(newAddress.getLatitude());
			address.setLongitude(newAddress.getLongitude());
			address.setPlace(newAddress.getPlace());
			address.setPostalCode(newAddress.getPostalCode());
			address.setStreet(newAddress.getStreet());
			return repo.save(address);
		}).orElseGet(() -> {
			newAddress.setId(id);
			return repo.save(newAddress);
		});
	}
	
	public AddressEntity updateSuburb(String addressId, SuburbEntity suburb) {		
		AddressEntity address = repo.findById(addressId).orElseThrow(() -> new NotFoundException(addressId));
		address.setSuburb(suburb);
		return repo.save(address);
		
	}	
}
