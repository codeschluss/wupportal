package de.codeschluss.portal.functional.activity;

import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.PagingAndSortingAssembler;

@Service
public class ActivityResourceAssembler extends PagingAndSortingAssembler<ActivityEntity> {

	@Override
	protected List<Link> createResourceLinks(ActivityEntity entity) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
