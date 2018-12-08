package de.codeschluss.portal.components.images.organisation;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.service.QueryBuilder;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class OrganisationImageQueryBuilder.
 *
 * @author Valmir Etemi
 */
@Service
public class OrganisationImageQueryBuilder extends QueryBuilder<QOrganisationImageEntity> {

  /** The default sort prop. */
  protected final String defaultSortProp = "caption";
  
  /**
   * Instantiates a new organisation image query builder.
   *
   */
  public OrganisationImageQueryBuilder() {
    super(QOrganisationImageEntity.organisationImageEntity);
  }

  @Override
  public <P extends FilterSortPaginate> Predicate search(P params) {
    String filter = prepareFilter(params.getFilter());
    return query.organisation.name.likeIgnoreCase(filter);
  }

  /**
   * For organisation id.
   *
   * @param organisationId the organisation id
   * @return the boolean expression
   */
  public BooleanExpression forOrganisationId(String organisationId) {
    return query.organisation.id.eq(organisationId);
  }

}
