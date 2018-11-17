package de.codeschluss.portal.functional.schedule;

import java.util.List;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.NotFoundException;

@Service
public class ScheduleService extends DataService<ScheduleEntity, ScheduleRepository>{

	protected final String DEFAULT_SORT_PROP = "startDate";
	
	public ScheduleService(ScheduleRepository repo, ScheduleResourceAssembler assembler) {
		super(repo, assembler);
	}

	@Override
	public ScheduleEntity getExisting(ScheduleEntity newSchedule) {
		return repo.findById(newSchedule.getId()).orElse(null);
	}
	
	public Object getResourceByActivity(String activityId) {
		List<ScheduleEntity> schedules = repo.findByActivityId(activityId).orElseThrow(() -> new NotFoundException(activityId));
		return assembler.entitiesToResources(schedules, null);
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
