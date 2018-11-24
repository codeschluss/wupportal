package de.codeschluss.portal.components.schedule;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;

import de.codeschluss.portal.components.schedule.QScheduleEntity;
import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import org.springframework.stereotype.Service;

@Service
public class ScheduleQueryBuilder extends QueryBuilder {
  
  private final QScheduleEntity query;
  
  public ScheduleQueryBuilder() {
    this.query = QScheduleEntity.scheduleEntity;
  }

  public BooleanExpression forActivityAndCurrentOnly(String activityId) {
    return query.activity.id.eq(activityId)
    .and(query.startDate.after(Expressions.currentTimestamp()));
  }
  
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.activity.name.likeIgnoreCase(filter);
  }

}
