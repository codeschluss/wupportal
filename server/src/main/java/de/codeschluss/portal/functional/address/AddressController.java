package de.codeschluss.portal.functional.address;

import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.core.common.CrudController;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.security.permissions.ProviderOrSuperUserPermission;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;
import de.codeschluss.portal.core.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.suburb.SuburbService;

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

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.CrudController#findAll(de.codeschluss.
   * portal.core.utils.FilterSortPaginate)
   */
  @Override
  @GetMapping("/addresses")
  public ResponseEntity<?> findAll(FilterSortPaginate params) {
    return super.findAll(params);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#findOne(java.lang.String)
   */
  @Override
  @GetMapping("/addresses/{addressId}")
  public Resource<AddressEntity> findOne(@PathVariable String addressId) {
    return super.findOne(addressId);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#add(de.codeschluss.portal.
   * core.common.BaseEntity)
   */
  @Override
  @PostMapping("/addresses")
  @ProviderOrSuperUserPermission
  public ResponseEntity<?> add(@RequestBody AddressEntity newAddress) throws URISyntaxException {
    return super.add(newAddress);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#update(de.codeschluss.portal
   * .core.common.BaseEntity, java.lang.String)
   */
  @Override
  @PutMapping("/addresses/{addressId}")
  @SuperUserPermission
  public ResponseEntity<?> update(@RequestBody AddressEntity newAddress,
      @PathVariable String addressId) throws URISyntaxException {
    return super.update(newAddress, addressId);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.CrudController#delete(java.lang.String)
   */
  @Override
  @DeleteMapping("/addresses/{addressId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String addressId) {
    return super.delete(addressId);
  }

  /**
   * Find suburb.
   *
   * @param addressId
   *          the address id
   * @return the response entity
   */
  @GetMapping("/addresses/{addressId}/suburb")
  public ResponseEntity<Resource<?>> findSuburb(@PathVariable String addressId) {
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
