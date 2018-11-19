package de.codeschluss.portal.components.schedule;

import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class ScheduleService.
 */
@Service
public class ScheduleService extends DataService<ScheduleEntity, ScheduleRepository> {

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
  public ScheduleService(ScheduleRepository repo, ScheduleResourceAssembler assembler) {
    super(repo, assembler);
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
  public Object getResourceByActivity(String activityId) {
    List<ScheduleEntity> schedules = repo
        .findByActivityIdAndFutureOnly(activityId, new Sort(Direction.ASC, defaultSortProp))
        .orElseThrow(() -> new NotFoundException(activityId));
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
}
