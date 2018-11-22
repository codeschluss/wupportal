package de.codeschluss.portal.components.activity;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;

import de.codeschluss.portal.components.provider.ProviderEntity;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ActivityQueryBuilder {
  
  private final QActivityEntity query;
  
  public ActivityQueryBuilder() {
    this.query = QActivityEntity.activityEntity;
  }

  public Predicate isId(String id) {
    return query.id.eq(id);
  }

  public Predicate anyProvider(List<ProviderEntity> providers) {
    return query.provider.in(providers);
  }

  public Predicate isActivityForProvider(String activityId, List<ProviderEntity> providers) {
    return query.id.eq(activityId).and(query.provider.in(providers));
  }
  
  public Predicate isCurrentFuzzySearch(String filter) {
    return isCurrent().and(fuzzySearchQuery(filter));
  }

  public Predicate fuzzySearchQuery(String filter) {
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
  
  public BooleanExpression isCurrent() {
    return query.schedules.any().startDate.after(Expressions.currentTimestamp());
  }

}
