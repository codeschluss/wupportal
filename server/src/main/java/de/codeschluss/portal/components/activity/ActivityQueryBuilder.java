package de.codeschluss.portal.components.activity;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;

import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.i18n.language.LanguageService;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import java.util.List;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class ActivityQueryBuilder.
 */
@Service
public class ActivityQueryBuilder extends QueryBuilder<QActivityEntity> {
  
  /** The language service. */
  private final LanguageService languageService;
  
  /**
   * Instantiates a new activity query builder.
   *
   * @param languageService the language service
   */
  public ActivityQueryBuilder(LanguageService languageService) {
    super(QActivityEntity.activityEntity);
    this.languageService = languageService;
  }
  
  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common
   * .QueryBuilder#search(de.codeschluss.portal.core.utils.FilterSortPaginate)
   */
  @Override
  public Predicate search(FilterSortPaginate p) {
    ActivityQueryParam params = validateParams(p);
    
    String filter = params.getFilter();
    BooleanBuilder search = new BooleanBuilder();
    if (params.getCurrent() != null && params.getCurrent()) {
      search.and(withCurrentSchedulesOnly());
    }
    
    return filter != null && !filter.isEmpty()
        ? fuzzyTextSearch(params, search)
        : advancedSearch(params, search);
  }
  
  /**
   * Fuzzy text search.
   *
   * @param params the params
   * @param search the search
   * @return the predicate
   */
  public Predicate fuzzyTextSearch(ActivityQueryParam params, BooleanBuilder search) {
    List<String> locales = languageService.getCurrentReadLocales();
    String filter = prepareFilter(params.getFilter());
    BooleanExpression textSearch = query.translatables.any().language.locale.in(locales)
        .and(
            query.translatables.any().name.likeIgnoreCase(filter)
            .or(query.translatables.any().description.likeIgnoreCase(filter)))
        .or(query.address.street.likeIgnoreCase(filter))
        .or(query.address.place.likeIgnoreCase(filter))
        .or(query.address.houseNumber.likeIgnoreCase(filter))
        .or(query.address.postalCode.likeIgnoreCase(filter))
        .or(query.address.suburb.name.likeIgnoreCase(filter))
        .or(likeTags(filter, locales))
        .or(likeTargetGroups(filter, locales))
        .or(likeCategory(filter, locales));
    
    return search.and(textSearch).getValue();
  }
  
  /**
   * Like target groups.
   *
   * @param filter the filter
   * @param locales the locales
   * @return the predicate
   */
  private Predicate likeTargetGroups(String filter, List<String> locales) {
    return query.targetGroups.any().translatables.any().name.likeIgnoreCase(filter)
    .and(query.targetGroups.any().translatables.any().language.locale.in(locales));
  }

  /**
   * Like tags.
   *
   * @param filter the filter
   * @param locales the locales
   * @return the predicate
   */
  private Predicate likeTags(String filter, List<String> locales) {
    return query.tags.any().translatables.any().name.likeIgnoreCase(filter)
        .and(query.tags.any().translatables.any().language.locale.in(locales));
  }

  /**
   * Like category.
   *
   * @param filter the filter
   * @param locales the locales
   * @return the predicate
   */
  private Predicate likeCategory(String filter, List<String> locales) {
    return query.category.translatables.any().name.likeIgnoreCase(filter)
        .and(query.category.translatables.any().language.locale.in(locales));
  }

  /**
   * Advanced search.
   *
   * @param params the params
   * @param search the search
   * @return the predicate
   */
  public Predicate advancedSearch(ActivityQueryParam params, BooleanBuilder search) {
    BooleanBuilder advancedSearch = new BooleanBuilder();
    if (params.getCategories() != null && !params.getCategories().isEmpty()) {
      advancedSearch.or(withAnyOfCategories(params.getCategories()));
    }
    if (params.getSuburbs() != null && !params.getSuburbs().isEmpty()) {
      advancedSearch.or(withAnyOfSuburbs(params.getSuburbs()));
    }
    if (params.getTargetgroups() != null && !params.getTargetgroups().isEmpty()) {
      advancedSearch.or(withAnyOfTargetGroups(params.getTargetgroups()));
    }    
    return search.and(advancedSearch).getValue();
  }

  /**
   * With any of target groups.
   *
   * @param targetgroups the targetgroups
   * @return the boolean expression
   */
  public BooleanExpression withAnyOfTargetGroups(List<String> targetgroups) {
    return query.targetGroups.any().id.in(targetgroups);
  }

  /**
   * With any of categories.
   *
   * @param categories the categories
   * @return the boolean expression
   */
  public BooleanExpression withAnyOfCategories(List<String> categories) {
    return query.category.id.in(categories);
  }
  
  /**
   * With any of suburbs.
   *
   * @param suburbs the suburbs
   * @return the boolean expression
   */
  public BooleanExpression withAnyOfSuburbs(List<String> suburbs) {
    return query.address.suburb.id.in(suburbs);
  }
  
  /**
   * For id with any of providers.
   *
   * @param activityId the activity id
   * @param providers the providers
   * @return the boolean expression
   */
  public BooleanExpression forIdWithAnyOfProviders(
      String activityId, List<ProviderEntity> providers) {
    return withId(activityId).and(withAnyOfProviders(providers));
  }
  
  /**
   * With any of providers.
   *
   * @param providers the providers
   * @return the boolean expression
   */
  public BooleanExpression withAnyOfProviders(List<ProviderEntity> providers) {
    return query.provider.in(providers);
  }
  
  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common.QueryBuilder#withId(java.lang.String)
   */
  public BooleanExpression withId(String id) {
    return query.id.eq(id);
  }

  /**
   * With current schedules only.
   *
   * @return the boolean expression
   */
  public BooleanExpression withCurrentSchedulesOnly() {
    return query.schedules.any().startDate.after(Expressions.currentTimestamp());
  }
  
  /**
   * Validate params.
   *
   * @param <P> the generic type
   * @param p the p
   * @return the activity query param
   */
  private <P extends FilterSortPaginate> ActivityQueryParam validateParams(P p) {
    if (p instanceof ActivityQueryParam) {
      return (ActivityQueryParam) p;
    }
    throw new RuntimeException(
        "Must be of type " + ActivityQueryParam.class + " but is " + p.getClass());
  }

}
