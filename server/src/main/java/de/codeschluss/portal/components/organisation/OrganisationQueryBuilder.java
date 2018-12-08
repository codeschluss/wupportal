package de.codeschluss.portal.components.organisation;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.activity.ActivityQueryParam;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.i18n.language.LanguageService;
import de.codeschluss.portal.core.service.QueryBuilder;

import java.util.List;

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
  
  /** The default sort prop. */
  protected final String defaultSortProp = "name";
  
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
  
  @Override
  protected String prepareSort(String sortProp) {
    return sortProp.equals("description")
        ? "translatables." + sortProp
        : sortProp;
  }
  
  @Override
  public boolean localized() {
    return true;
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

  @Override
  public Predicate search(FilterSortPaginate p) {
    OrganisationQueryParam params = validateParams(p);
    List<String> locales = languageService.getCurrentReadLocales();
    BooleanBuilder search = new BooleanBuilder(withLocalized(locales));
    return params.isEmptyQuery()
        ? search.getValue()
        : searchFiltered(search, params);
  }
  
  /**
   * With localized.
   *
   * @param locales the locales
   * @return the predicate
   */
  private Predicate withLocalized(List<String> locales) {
    return query.translatables.any().language.locale.in(locales);
  }
  
  /**
   * Search filtered.
   *
   * @param search the search
   * @param params the params
   * @return the predicate
   */
  private Predicate searchFiltered(BooleanBuilder search, OrganisationQueryParam params) {
    if (params.getApproved() != null && params.getApproved()) {
      search.and(withApprovedOnly());
    }
    String filter = prepareFilter(params.getFilter());
    return search.and(
        query.name.likeIgnoreCase(filter)
        .or(likeDescription(filter))
        .or(query.mail.likeIgnoreCase(filter))
        .or(query.phone.likeIgnoreCase(filter))
        .or(query.website.likeIgnoreCase(filter))
        .or(query.address.houseNumber.likeIgnoreCase(filter))
        .or(query.address.place.likeIgnoreCase(filter))
        .or(query.address.street.likeIgnoreCase(filter)));
  }
  

  /**
   * With approved only.
   *
   * @return the predicate
   */
  private Predicate withApprovedOnly() {
    return query.approved.isTrue();
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
  

  /**
   * Validate params.
   *
   * @param <P> the generic type
   * @param p the p
   * @return the organisation query param
   */
  private <P extends FilterSortPaginate> OrganisationQueryParam validateParams(P p) {
    if (p instanceof OrganisationQueryParam) {
      return (OrganisationQueryParam) p;
    }
    throw new RuntimeException(
        "Must be of type " + OrganisationQueryParam.class + " but is " + p.getClass());
  }
}
