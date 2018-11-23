package de.codeschluss.portal.components.targetgroup;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.common.QueryBuilder;

import org.springframework.stereotype.Service;

@Service
public class TargetGroupQueryBuilder implements QueryBuilder {

  private final QTargetGroupEntity query;
  
  /**
   * Instantiates a new target group query builder.
   */
  public TargetGroupQueryBuilder() {
    this.query = QTargetGroupEntity.targetGroupEntity;
  }

  public BooleanExpression withName(String name) {
    return query.name.eq(name);
  }

  public Predicate withAnyActivityId(String activityId) {
    return query.activities.any().id.eq(activityId);
  }
  
  public BooleanExpression fuzzySearch(String filter) {
    return query.name.likeIgnoreCase(filter)
        .or(query.description.likeIgnoreCase(filter));
  }
}
