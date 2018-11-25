package de.codeschluss.portal.components.activity;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;

import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import java.util.List;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class ActivityQueryBuilder.
 */
@Service
public class ActivityQueryBuilder extends QueryBuilder {
  
  /** The query. */
  private final QActivityEntity query;
  
  /**
   * Instantiates a new activity query builder.
   */
  public ActivityQueryBuilder() {
    this.query = QActivityEntity.activityEntity;
  }
  
  /**
   * Fuzzy search.
   *
   * @param p the p
   * @return the predicate
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
   * @return the predicate
   */
  public Predicate fuzzyTextSearch(ActivityQueryParam params, BooleanBuilder search) {
    String filter = prepareFilter(params.getFilter());
    BooleanExpression textSearch = query.name.likeIgnoreCase(filter)
        .or(query.description.likeIgnoreCase(filter))
        .or(query.address.street.likeIgnoreCase(filter))
        .or(query.address.place.likeIgnoreCase(filter))
        .or(query.address.houseNumber.likeIgnoreCase(filter))
        .or(query.address.postalCode.likeIgnoreCase(filter))
        .or(query.address.suburb.name.likeIgnoreCase(filter))
        .or(query.tags.any().name.likeIgnoreCase(filter))
        .or(query.targetGroups.any().name.likeIgnoreCase(filter))
        .or(query.category.name.likeIgnoreCase(filter));
    return search.and(textSearch).getValue();
  }
  
  /**
   * Advanced search.
   *
   * @param params the params
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
   * For id with any of.
   *
   * @param activityId the activity id
   * @param providers the providers
   * @return the predicate
   */
  public BooleanExpression forIdWithAnyOfProviders(
      String activityId, List<ProviderEntity> providers) {
    return withId(activityId).and(withAnyOfProviders(providers));
  }
  
  /**
   * With any of.
   *
   * @param providers the providers
   * @return the predicate
   */
  public BooleanExpression withAnyOfProviders(List<ProviderEntity> providers) {
    return query.provider.in(providers);
  }
  
  /**
   * With id.
   *
   * @param id the id
   * @return the predicate
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
   * @param <P>          the generic type
   * @param p          the p
   * @return the activity queries
   */
  private <P extends FilterSortPaginate> ActivityQueryParam validateParams(P p) {
    if (p instanceof ActivityQueryParam) {
      return (ActivityQueryParam) p;
    }
    throw new RuntimeException(
        "Must be of type " + ActivityQueryParam.class + " but is " + p.getClass());
  }

}
