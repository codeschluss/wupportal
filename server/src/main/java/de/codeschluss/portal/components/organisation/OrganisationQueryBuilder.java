package de.codeschluss.portal.components.organisation;

import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.translations.language.LanguageService;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class OrganisationQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class OrganisationQueryBuilder extends QueryBuilder<QOrganisationEntity> {
  
  /** The language service. */
  private final LanguageService languageService;
  
  /**
   * Instantiates a new organisation query builder.
   *
   * @param languageService the language service
   */
  public OrganisationQueryBuilder(LanguageService languageService) {
    super(QOrganisationEntity.organisationEntity);
    this.languageService = languageService;
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

  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common.
   * QueryBuilder#fuzzySearch(de.codeschluss.portal.core.utils.FilterSortPaginate)
   */
  @Override
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.name.likeIgnoreCase(filter)
      .or(likeDescription(filter))
      .or(query.mail.likeIgnoreCase(filter))
      .or(query.phone.likeIgnoreCase(filter))
      .or(query.website.likeIgnoreCase(filter))
      .or(query.address.houseNumber.likeIgnoreCase(filter))
      .or(query.address.place.likeIgnoreCase(filter))
      .or(query.address.street.likeIgnoreCase(filter));
  }
  
  /**
   * Description.
   *
   * @param filter the filter
   * @return the predicate
   */
  private BooleanExpression likeDescription(String filter) {
    return 
        query.translatables.any().description.likeIgnoreCase(filter)
        .and(query.translatables.any().language.locale.in(languageService.getCurrentReadLocales()));
  }

  public BooleanExpression forActivity(String activityId) {
    return query.providers.any().activities.any().id.eq(activityId);
  }
}
