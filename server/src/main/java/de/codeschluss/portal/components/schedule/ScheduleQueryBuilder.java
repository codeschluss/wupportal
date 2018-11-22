package de.codeschluss.portal.components.schedule;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;

import de.codeschluss.portal.components.schedule.QScheduleEntity;

import org.springframework.stereotype.Service;

@Service
public class ScheduleQueryBuilder {
  
  private final QScheduleEntity query;
  
  public ScheduleQueryBuilder() {
    this.query = QScheduleEntity.scheduleEntity;
  }

  public BooleanExpression isCurrentScheduleForActivity(String activityId) {
    return query.activity.id.eq(activityId)
    .and(query.startDate.after(Expressions.currentTimestamp()));
  }
  
  public BooleanExpression fuzzySearchQuery(String filter) {
    return query.activity.name.likeIgnoreCase(filter);
  }

}
