package de.codeschluss.portal.components.address;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.components.suburb.SuburbEntity;
import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class AddressService.
 */
@Service
public class AddressService extends DataService<AddressEntity> {

  /** The default sort prop. */
  protected final String defaultSortProp = "street";
  
  private final AddressQueryBuilder queryBuilder;

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
      AddressResourceAssembler assembler,
      AddressQueryBuilder queryBuilder) {
    super(repo, assembler);
    this.queryBuilder = queryBuilder;
  }

  @Override
  public AddressEntity getExisting(AddressEntity address) {
    return repo.findOne(queryBuilder.isAddress(address)).orElse(null);
  }

  /**
   * Gets the resources with suburbs by organisation.
   *
   * @param orgaId
   *          the orga id
   * @return the resources with suburbs by organisation
   */
  public Resource<?> getResourcesWithSuburbsByOrganisation(String orgaId) {
    AddressEntity address = repo.findOne(queryBuilder.anyOrganisationId(orgaId))
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
    AddressEntity address = repo.findOne(queryBuilder.anyActivityId(activityId))
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

  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common.DataService#getFilteredPredicate(java.lang.String)
   */
  @Override
  protected Predicate getFilteredPredicate(String filter) {
    filter = prepareFilter(filter);
    return queryBuilder.fuzzySearchQuery(filter);
  }
}
