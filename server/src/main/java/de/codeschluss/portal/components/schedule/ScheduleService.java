package de.codeschluss.portal.components.schedule;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.api.ResourceDataService;
import de.codeschluss.portal.core.api.dto.CustomSort;
import de.codeschluss.portal.core.exception.NotFoundException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class ScheduleService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class ScheduleService extends ResourceDataService<ScheduleEntity, ScheduleQueryBuilder> {

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

  @Override
  public ScheduleEntity getExisting(ScheduleEntity newSchedule) {
    return repo.findById(newSchedule.getId()).orElse(null);
  }

  /**
   * Gets the resource by activity.
   *
   * @param activityId the activity id
   * @param params the params
   * @return the resource by activity
   */
  public Resources<?> getResourceByActivity(String activityId, CustomSort params) {
    Predicate query = entities.forActivityAndCurrentOnly(activityId);
    List<ScheduleEntity> schedules = repo.findAll(query, entities.createSort(params));
    if (schedules == null || schedules.isEmpty()) {
      throw new NotFoundException(activityId);
    }
    return assembler.entitiesToResources(schedules, params);
  }

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
}
