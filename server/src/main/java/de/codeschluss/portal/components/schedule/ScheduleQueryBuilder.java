package de.codeschluss.portal.components.schedule;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;

import de.codeschluss.portal.components.schedule.QScheduleEntity;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.service.QueryBuilder;

import org.springframework.stereotype.Service;

/**
 * The Class ScheduleQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class ScheduleQueryBuilder extends QueryBuilder<QScheduleEntity> {
  
  public ScheduleQueryBuilder() {
    super(QScheduleEntity.scheduleEntity);
  }

  public BooleanExpression forActivityAndCurrentOnly(String activityId) {
    return query.activity.id.eq(activityId)
    .and(query.startDate.after(Expressions.currentTimestamp()));
  }
  
  @Override
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.activity.translatables.any().name.likeIgnoreCase(filter);
  }

}
