package de.codeschluss.portal.components.address;

import static org.springframework.http.ResponseEntity.created;
import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.components.suburb.SuburbService;
import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.security.permissions.ProviderOrSuperUserPermission;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;

import java.net.URI;
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

// TODO: Auto-generated Javadoc
/**
 * The Class AddressController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class AddressController extends CrudController<AddressEntity, AddressService> {

  /** The suburb service. */
  private final SuburbService suburbService;

  /**
   * Instantiates a new address controller.
   *
   * @param service
   *          the service
   * @param suburbService
   *          the suburb service
   */
  public AddressController(AddressService service, SuburbService suburbService) {
    super(service);
    this.suburbService = suburbService;
  }

  @Override
  @GetMapping("/addresses")
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    return super.readAll(params);
  }

  @Override
  @GetMapping("/addresses/{addressId}")
  public Resource<AddressEntity> readOne(@PathVariable String addressId) {
    return super.readOne(addressId);
  }

  @Override
  @PostMapping("/addresses")
  @ProviderOrSuperUserPermission
  public ResponseEntity<?> create(@RequestBody AddressEntity newAddress) throws URISyntaxException {
    validateCreate(newAddress);

    try {
      newAddress.setSuburb(suburbService.getById(newAddress.getSuburbId()));
    } catch (NotFoundException e) {
      throw new BadParamsException("Need existing Suburb");
    }

    Resource<AddressEntity> resource = service.addResource(newAddress);
    return created(new URI(resource.getId().expand().getHref())).body(resource);
  }

  @Override
  @PutMapping("/addresses/{addressId}")
  @SuperUserPermission
  public ResponseEntity<?> update(@RequestBody AddressEntity newAddress,
      @PathVariable String addressId) throws URISyntaxException {
    return super.update(newAddress, addressId);
  }

  @Override
  @DeleteMapping("/addresses/{addressId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String addressId) {
    return super.delete(addressId);
  }

  /**
   * Read suburb.
   *
   * @param addressId
   *          the address id
   * @return the response entity
   */
  @GetMapping("/addresses/{addressId}/suburb")
  public ResponseEntity<Resource<?>> readSuburb(@PathVariable String addressId) {
    return ok(suburbService.getResourceByAddress(addressId));
  }

  /**
   * Update suburb.
   *
   * @param addressId
   *          the address id
   * @param suburbId
   *          the suburb id
   * @return the response entity
   */
  @PutMapping("/addresses/{addressId}/suburb")
  @SuperUserPermission
  public ResponseEntity<Resource<?>> updateSuburb(@PathVariable String addressId,
      @RequestBody String suburbId) {
    if (service.existsById(addressId) && suburbService.existsById(suburbId)) {
      service.updateSuburb(addressId, suburbService.getById(suburbId));
      return ok(suburbService.getResourceByAddress(addressId));
    } else {
      throw new BadParamsException("Address or Suburb with given ID do not exist!");
    }
  }
}
