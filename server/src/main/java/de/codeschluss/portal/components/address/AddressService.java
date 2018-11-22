package de.codeschluss.portal.components.address;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

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
public class AddressService extends DataService<AddressEntity, QAddressEntity> {

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
  public AddressService(
      AddressRepository repo, 
      AddressResourceAssembler assembler) {
    super(repo, assembler, QAddressEntity.addressEntity);
  }


  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common
   * .DataService#getExisting(de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public AddressEntity getExisting(AddressEntity address) {
    BooleanExpression isHousnumber = query.houseNumber.eq(address.getHouseNumber());
    BooleanExpression isPlace = query.place.eq(address.getPlace());
    BooleanExpression isPostalCode = query.postalCode.eq(address.getPostalCode());
    BooleanExpression isStreet = query.street.eq(address.getStreet());

    return repo.findOne(isHousnumber.and(isPlace).and(isPostalCode).and(isStreet)).orElse(null);
  }

  /**
   * Gets the resources with suburbs by organisation.
   *
   * @param orgaId
   *          the orga id
   * @return the resources with suburbs by organisation
   */
  public Resource<?> getResourcesWithSuburbsByOrganisation(String orgaId) {
    AddressEntity address = repo.findOne(query.organisations.any().id.eq(orgaId))
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
    AddressEntity address = repo.findOne(query.activities.any().id.eq(activityId))
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
    return query.houseNumber.likeIgnoreCase(filter)
        .or(query.place.likeIgnoreCase(filter))
        .or(query.postalCode.likeIgnoreCase(filter))
        .or(query.street.likeIgnoreCase(filter));
  }
}
