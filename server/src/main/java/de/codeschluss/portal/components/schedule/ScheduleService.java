package de.codeschluss.portal.components.schedule;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;

import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class ScheduleService.
 */
@Service
public class ScheduleService extends DataService<ScheduleEntity, QScheduleEntity> {

  /** The default sort prop. */
  protected final String defaultSortProp = "startDate";

  /**
   * Instantiates a new schedule service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  @Autowired
  public ScheduleService(
      ScheduleRepository repo, 
      ScheduleResourceAssembler assembler) {
    super(repo, assembler, QScheduleEntity.scheduleEntity);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.DataService#getExisting(de.codeschluss.
   * portal.core.common.BaseEntity)
   */
  @Override
  public ScheduleEntity getExisting(ScheduleEntity newSchedule) {
    return repo.findById(newSchedule.getId()).orElse(null);
  }

  /**
   * Gets the resource by activity.
   *
   * @param activityId
   *          the activity id
   * @return the resource by activity
   */
  public Resources<?> getResourceByActivity(String activityId) {
    BooleanExpression predicate = query
        .activity.id.eq(activityId)
        .and(query.startDate.after(Expressions.currentTimestamp()));
 
    List<ScheduleEntity> schedules = repo.findAll(predicate);
    if (schedules == null || schedules.isEmpty()) {
      throw new NotFoundException(activityId);
    }
    
    return assembler.entitiesToResources(schedules, null);
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.DataService#update(java.lang.String,
   * de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public ScheduleEntity update(String id, ScheduleEntity newSchedule) {
    return repo.findById(id).map(schedule -> {
      schedule.setStartDate(newSchedule.getStartDate());
      schedule.setEndDate(newSchedule.getEndDate());
      return repo.save(schedule);
    }).orElseGet(() -> {
      newSchedule.setId(id);
      return repo.save(newSchedule);
    });
  }

  @Override
  protected Predicate getFilteredPredicate(String filter) {
    filter = prepareFilter(filter);
    return query.activity.name.eq(filter);
  }
}
