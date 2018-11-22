package de.codeschluss.portal.components.targetgroup;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import org.springframework.stereotype.Service;

@Service
public class TargetGroupQueryBuilder {

  private final QTargetGroupEntity query;
  
  public TargetGroupQueryBuilder() {
    this.query = QTargetGroupEntity.targetGroupEntity;
  }

  public BooleanExpression isName(String name) {
    return query.name.eq(name);
  }

  public Predicate anyActivityId(String activityId) {
    return query.activities.any().id.eq(activityId);
  }
  
  public BooleanExpression fuzzySearchQuery(String filter) {
    return query.name.likeIgnoreCase(filter)
        .or(query.description.likeIgnoreCase(filter));
  }
}
