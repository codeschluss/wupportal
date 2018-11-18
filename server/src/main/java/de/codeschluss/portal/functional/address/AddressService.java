package de.codeschluss.portal.functional.address;

import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.functional.suburb.SuburbEntity;

import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class AddressService.
 */
@Service
public class AddressService extends DataService<AddressEntity, AddressRepository> {

  /** The default sort prop. */
  protected final String defaultSortProp = "street";

  /**
   * Instantiates a new address service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public AddressService(AddressRepository repo, AddressResourceAssembler assembler) {
    super(repo, assembler);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.DataService#getExisting(de.codeschluss.
   * portal.core.common.BaseEntity)
   */
  public AddressEntity getExisting(AddressEntity address) {
    return repo.findByHouseNumberAndPlaceAndPostalCodeAndStreet(address.getHouseNumber(),
        address.getPlace(), address.getPostalCode(), address.getStreet()).orElse(null);
  }

  /**
   * Gets the resources with suburbs by organisation.
   *
   * @param orgaId
   *          the orga id
   * @return the resources with suburbs by organisation
   */
  public Resource<?> getResourcesWithSuburbsByOrganisation(String orgaId) {
    AddressEntity address = repo.findByOrganisationsId(orgaId)
        .orElseThrow(() -> new NotFoundException(orgaId));
    return assembler.toResourceWithEmbedabble(address, address.getSuburb(), "suburb");
  }

  /**
   * Gets the resources with suburbs by activity.
   *
   * @param activityId
   *          the activity id
   * @return the resources with suburbs by activity
   */
  public Resource<?> getResourcesWithSuburbsByActivity(String activityId) {
    AddressEntity address = repo.findByActivitiesId(activityId)
        .orElseThrow(() -> new NotFoundException(activityId));
    return assembler.toResourceWithEmbedabble(address, address.getSuburb(), "suburb");
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.DataService#update(java.lang.String,
   * de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
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

  /**
   * Update suburb.
   *
   * @param addressId
   *          the address id
   * @param suburb
   *          the suburb
   * @return the address entity
   */
  public AddressEntity updateSuburb(String addressId, SuburbEntity suburb) {
    AddressEntity address = repo.findById(addressId)
        .orElseThrow(() -> new NotFoundException(addressId));
    address.setSuburb(suburb);
    return repo.save(address);

  }
}
