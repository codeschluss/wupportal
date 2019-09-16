package de.codeschluss.portal.components.address;

import de.codeschluss.portal.components.address.bingmaps.MapService;
import de.codeschluss.portal.components.suburb.SuburbEntity;
import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.service.ResourceDataService;
import javax.naming.ServiceUnavailableException;
import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class AddressService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class AddressService extends ResourceDataService<AddressEntity, AddressQueryBuilder> {
  
  private final MapService mapService;

  /**
   * Instantiates a new address service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public AddressService(
      AddressRepository repo, 
      AddressQueryBuilder entities,
      PagingAndSortingAssembler assembler, MapService mapService) {
    super(repo, entities, assembler);
    this.mapService = mapService;
  }

  @Override
  public AddressEntity getExisting(AddressEntity address) {
    return repo.findOne(entities.withAddress(address)).orElse(null);
  }
  
  @Override
  public boolean validCreateFieldConstraints(AddressEntity newAddress) {
    return validBaseFields(newAddress)
        && newAddress.getSuburbId() != null && !newAddress.getSuburbId().isEmpty();
  }
  
  @Override
  public boolean validUpdateFieldConstraints(AddressEntity newAddress) {
    return validBaseFields(newAddress);
  }

  /**
   * Valid base fields.
   *
   * @param newAddress the new address
   * @return true, if successful
   */
  private boolean validBaseFields(AddressEntity newAddress) {
    return newAddress.getPlace() != null && !newAddress.getPlace().isEmpty()
        && newAddress.getPostalCode() != null && !newAddress.getPostalCode().isEmpty()
        && newAddress.getStreet() != null && !newAddress.getStreet().isEmpty();
  }

  /**
   * Gets the resources with suburbs by organisation.
   *
   * @param orgaId
   *          the orga id
   * @return the resources with suburbs by organisation
   */
  public Resource<?> getResourcesByOrganisation(String orgaId) {
    AddressEntity address = repo.findOne(entities.withAnyOrganisationId(orgaId))
        .orElseThrow(() -> new NotFoundException(orgaId));
    return assembler.toResource(address);
  }

  /**
   * Gets the resources with suburbs by activity.
   *
   * @param activityId
   *          the activity id
   * @return the resources with suburbs by activity
   */
  public Resource<?> getResourcesByActivity(String activityId) {
    AddressEntity address = repo.findOne(entities.withAnyActivityId(activityId))
        .orElseThrow(() -> new NotFoundException(activityId));
    return assembler.toResource(address);
  }

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
   * < Update suburb.
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
  
  @Override
  public AddressEntity add(AddressEntity newAddress) throws ServiceUnavailableException {
    AddressEntity existing = getExisting(newAddress);
    if (existing != null) {
      return existing;
    }
    
    newAddress = mapService.retrieveExternalAddress(newAddress);
    
    existing = getExisting(newAddress);
    if (existing != null) {
      return existing;
    }
    
    return repo.save(newAddress);
  }
}
