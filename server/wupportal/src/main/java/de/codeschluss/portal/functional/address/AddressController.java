package de.codeschluss.portal.functional.address;

import static org.springframework.http.ResponseEntity.ok;

import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
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
import de.codeschluss.portal.common.security.permissions.ProviderOrSuperUserPermission;
import de.codeschluss.portal.common.security.permissions.SuperUserPermission;
import de.codeschluss.portal.common.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.suburb.SuburbService;

@RestController
public class AddressController extends CrudController<AddressEntity, AddressService> {

	private final SuburbService suburbService;
	
	public AddressController(AddressService service,
			SuburbService suburbService) {
		super(service);
		this.suburbService = suburbService;
	}
	
	@Override
	@GetMapping("/addresses")
	public ResponseEntity<?> findAll(FilterSortPaginate params) {
		return super.findAll(params);
	}

	@Override
	@GetMapping("/addresses/{addressId}")
	public Resource<AddressEntity> findOne(@PathVariable String addressId) {
		return super.findOne(addressId);
	}
	
	@Override
	@PostMapping("/addresses")
	@ProviderOrSuperUserPermission
	public ResponseEntity<?> add(@RequestBody AddressEntity newAddress) throws URISyntaxException {
		return super.add(newAddress);
	}
	
	@Override
	@PutMapping("/addresses/{addressId}")
	@SuperUserPermission
	public ResponseEntity<?> update(@RequestBody AddressEntity newAddress, @PathVariable String addressId) throws URISyntaxException {
		return super.update(newAddress, addressId);
	}
	
	@Override
	@DeleteMapping("/addresses/{addressId}")
	@SuperUserPermission
	public ResponseEntity<?> delete(@PathVariable String addressId) {
		return super.delete(addressId);
	}
	
	@GetMapping("/addresses/{addressId}/suburb")
	public ResponseEntity<Resource<?>> findSuburb(@PathVariable String addressId) {
		return ok(suburbService.getResourceByAddress(addressId));
	}
	
	@PutMapping("/addresses/{addressId}/suburb")
	@SuperUserPermission
	public ResponseEntity<Resource<?>> updateSuburb(@PathVariable String addressId, @RequestBody String suburbId) {
		if (service.existsById(addressId) && suburbService.existsById(suburbId)) {
			service.updateSuburb(addressId, suburbService.getById(suburbId));
			return ok(suburbService.getResourceByAddress(addressId));
		} else {
			//TODO: Error Objects with proper message
			throw new BadParamsException("Address or Suburb with given ID do not exist!");
		}	
	}

}
