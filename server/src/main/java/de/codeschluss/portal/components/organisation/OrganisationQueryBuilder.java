package de.codeschluss.portal.components.organisation;

import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.common.QueryBuilder;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class OrganisationQueryBuilder.
 */
@Service
public class OrganisationQueryBuilder implements QueryBuilder {

  /** The query. */
  private final QOrganisationEntity query;
  
  /**
   * Instantiates a new organisation query builder.
   */
  public OrganisationQueryBuilder() {
    this.query = QOrganisationEntity.organisationEntity;
  }
  
  /**
   * With name.
   *
   * @param name the name
   * @return the boolean expression
   */
  public BooleanExpression withName(String name) {
    return query.name.eq(name);
  }

  /**
   * Fuzzy search.
   *
   * @param filter the filter
   * @return the boolean expression
   */
  public BooleanExpression fuzzySearch(String filter) {
    return query.name.likeIgnoreCase(filter)
    .or(query.mail.likeIgnoreCase(filter))
    .or(query.phone.likeIgnoreCase(filter))
    .or(query.website.likeIgnoreCase(filter))
    .or(query.address.houseNumber.likeIgnoreCase(filter))
    .or(query.address.place.likeIgnoreCase(filter))
    .or(query.address.street.likeIgnoreCase(filter));
  }
}
