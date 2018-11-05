package de.codeschluss.portal.functional.address;

import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import de.codeschluss.portal.common.base.CrudController;
import de.codeschluss.portal.common.security.permissions.ProviderOrSuperUserPermission;
import de.codeschluss.portal.common.security.permissions.SuperUserPermission;
import de.codeschluss.portal.common.utils.FilterSortPaginate;

public class AddressController extends CrudController<AddressEntity, AddressService> {

	public AddressController(AddressService service) {
		super(service);
	}
	
	@Override
	@GetMapping("/addresses")
	@SuperUserPermission
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

}
