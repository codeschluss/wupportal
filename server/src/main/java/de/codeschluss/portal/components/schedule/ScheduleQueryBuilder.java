package de.codeschluss.portal.components.schedule;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;

import de.codeschluss.portal.components.schedule.QScheduleEntity;
import de.codeschluss.portal.core.common.QueryBuilder;

import org.springframework.stereotype.Service;

@Service
public class ScheduleQueryBuilder implements QueryBuilder {
  
  private final QScheduleEntity query;
  
  public ScheduleQueryBuilder() {
    this.query = QScheduleEntity.scheduleEntity;
  }

  public BooleanExpression forActivityAndCurrentOnly(String activityId) {
    return query.activity.id.eq(activityId)
    .and(query.startDate.after(Expressions.currentTimestamp()));
  }
  
  public BooleanExpression fuzzySearch(String filter) {
    return query.activity.name.likeIgnoreCase(filter);
  }

}
