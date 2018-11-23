package de.codeschluss.portal.components.activity;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;

import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.core.common.QueryBuilder;

import java.util.List;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class ActivityQueryBuilder.
 */
@Service
public class ActivityQueryBuilder implements QueryBuilder {
  
  /** The query. */
  private final QActivityEntity query;
  
  /**
   * Instantiates a new activity query builder.
   */
  public ActivityQueryBuilder() {
    this.query = QActivityEntity.activityEntity;
  }

  /**
   * With id.
   *
   * @param id the id
   * @return the predicate
   */
  public Predicate withId(String id) {
    return query.id.eq(id);
  }

  /**
   * With any of.
   *
   * @param providers the providers
   * @return the predicate
   */
  public Predicate withAnyOf(List<ProviderEntity> providers) {
    return query.provider.in(providers);
  }

  /**
   * For id with any of.
   *
   * @param activityId the activity id
   * @param providers the providers
   * @return the predicate
   */
  public Predicate forIdWithAnyOf(String activityId, List<ProviderEntity> providers) {
    return query.id.eq(activityId).and(query.provider.in(providers));
  }
  
  /**
   * Fuzzy with current schedules only.
   *
   * @param filter the filter
   * @return the predicate
   */
  public Predicate fuzzyWithCurrentSchedulesOnly(String filter) {
    return withCurrentSchedulesOnly().and(fuzzySearch(filter));
  }

  /**
   * Fuzzy search.
   *
   * @param filter the filter
   * @return the predicate
   */
  public BooleanExpression fuzzySearch(String filter) {
    return query.name.likeIgnoreCase(filter)
        .or(query.description.likeIgnoreCase(filter))
        .or(query.address.street.likeIgnoreCase(filter))
        .or(query.address.place.likeIgnoreCase(filter))
        .or(query.address.houseNumber.likeIgnoreCase(filter))
        .or(query.address.postalCode.likeIgnoreCase(filter))
        .or(query.address.suburb.name.likeIgnoreCase(filter))
        .or(query.tags.any().name.likeIgnoreCase(filter))
        .or(query.targetGroups.any().name.likeIgnoreCase(filter))
        .or(query.category.name.likeIgnoreCase(filter));
  }
  
  /**
   * With current schedules only.
   *
   * @return the boolean expression
   */
  public BooleanExpression withCurrentSchedulesOnly() {
    return query.schedules.any().startDate.after(Expressions.currentTimestamp());
  }

}
