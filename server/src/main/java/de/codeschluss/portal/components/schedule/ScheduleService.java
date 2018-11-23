package de.codeschluss.portal.components.schedule;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.common.ResourceDataService;
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
public class ScheduleService extends ResourceDataService<ScheduleEntity, ScheduleQueryBuilder> {

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
      ScheduleQueryBuilder entities,
      ScheduleResourceAssembler assembler) {
    super(repo, entities, assembler);
  }

  /*
   * (non-Javadoc)
   * 
   * @see
   * de.codeschluss.portal.core.common.ResourceDataService#getExisting(de.codeschluss.
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
    List<ScheduleEntity> schedules = repo.findAll(
        entities.forActivityAndCurrentOnly(activityId));
    if (schedules == null || schedules.isEmpty()) {
      throw new NotFoundException(activityId);
    }
    
    return assembler.entitiesToResources(schedules, null);
  }

  /*
   * (non-Javadoc)
   * 
   * @see de.codeschluss.portal.core.common.ResourceDataService#update(java.lang.String,
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
    return entities.fuzzySearch(filter);
  }
}
