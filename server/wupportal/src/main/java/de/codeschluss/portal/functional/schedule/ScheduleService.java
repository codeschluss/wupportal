package de.codeschluss.portal.functional.schedule;

import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.DataService;
import de.codeschluss.portal.common.base.PagingAndSortingAssembler;

@Service
public class ScheduleService extends DataService<ScheduleEntity, ScheduleRepository>{

	public ScheduleService(ScheduleRepository repo, PagingAndSortingAssembler<ScheduleEntity> assembler) {
		super(repo, assembler);
		// TODO Auto-generated constructor stub
	}

	@Override
	public ScheduleEntity getDuplicate(ScheduleEntity newEntity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ScheduleEntity update(String id, ScheduleEntity updatedEntity) {
		// TODO Auto-generated method stub
		return null;
	}

}
