package de.codeschluss.portal.functional.schedule;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.exception.NotFoundException;

@Service
public class ScheduleService extends DataService<ScheduleEntity, ScheduleRepository>{

	public ScheduleService(ScheduleRepository repo, ScheduleResourceAssembler assembler) {
		super(repo, assembler);
	}

	@Override
	public ScheduleEntity getDuplicate(ScheduleEntity newSchedule) {
		return repo.findById(newSchedule.getId()).orElse(null);
	}
	
	public Object getResourceByActivity(String activityId, ResponseEntity<?> responseEntity) {
		List<ScheduleEntity> schedules = repo.findByActivityId(activityId).orElseThrow(() -> new NotFoundException(activityId));
		return assembler.entitiesToResources(schedules, responseEntity);
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
