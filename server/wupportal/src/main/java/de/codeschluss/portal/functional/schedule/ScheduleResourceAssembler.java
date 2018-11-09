package de.codeschluss.portal.functional.schedule;

import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.PagingAndSortingAssembler;

@Service
public class ScheduleResourceAssembler extends PagingAndSortingAssembler<ScheduleEntity> {

	@Override
	protected List<Link> createResourceLinks(ScheduleEntity entity) {
		// TODO Auto-generated method stub
		return null;
	}

}
