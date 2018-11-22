package de.codeschluss.portal.components.organisation;

import com.querydsl.core.types.dsl.BooleanExpression;

import org.springframework.stereotype.Service;

@Service
public class OrganisationQueryBuilder {

  private final QOrganisationEntity query;
  
  public OrganisationQueryBuilder() {
    this.query = QOrganisationEntity.organisationEntity;
  }
  
  public BooleanExpression isName(String name) {
    return query.name.eq(name);
  }

  public BooleanExpression fuzzySearchQuery(String filter) {
    return query.name.likeIgnoreCase(filter)
    .or(query.mail.likeIgnoreCase(filter))
    .or(query.phone.likeIgnoreCase(filter))
    .or(query.website.likeIgnoreCase(filter))
    .or(query.address.houseNumber.likeIgnoreCase(filter))
    .or(query.address.place.likeIgnoreCase(filter))
    .or(query.address.street.likeIgnoreCase(filter));
  }
}
