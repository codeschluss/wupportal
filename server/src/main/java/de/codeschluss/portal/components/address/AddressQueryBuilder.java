package de.codeschluss.portal.components.address;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.address.QAddressEntity;

import org.springframework.stereotype.Service;

@Service
public class AddressQueryBuilder {
  
  private final QAddressEntity query;
  
  public AddressQueryBuilder() {
    this.query = QAddressEntity.addressEntity;
  }

  public BooleanExpression isAddress(AddressEntity address) {
    BooleanExpression isHousnumber = query.houseNumber.eq(address.getHouseNumber());
    BooleanExpression isPlace = query.place.eq(address.getPlace());
    BooleanExpression isPostalCode = query.postalCode.eq(address.getPostalCode());
    BooleanExpression isStreet = query.street.eq(address.getStreet());
    
    return isHousnumber
        .and(isPlace)
        .and(isPostalCode)
        .and(isStreet);
  }

  public Predicate anyOrganisationId(String orgaId) {
    return query.organisations.any().id.eq(orgaId);
  }

  public Predicate anyActivityId(String activityId) {
    return query.activities.any().id.eq(activityId);
  }

  public Predicate fuzzySearchQuery(String filter) {
    return query.houseNumber.likeIgnoreCase(filter)
        .or(query.place.likeIgnoreCase(filter))
        .or(query.postalCode.likeIgnoreCase(filter))
        .or(query.street.likeIgnoreCase(filter));
  }

}
