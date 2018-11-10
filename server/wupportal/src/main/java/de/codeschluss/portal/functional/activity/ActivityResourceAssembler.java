package de.codeschluss.portal.functional.activity;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.PagingAndSortingAssembler;

@Service
public class ActivityResourceAssembler extends PagingAndSortingAssembler<ActivityEntity> {

	@Override
	protected List<Link> createResourceLinks(ActivityEntity activity) {
		List<Link> links = new ArrayList<Link>();
		
		links.add(linkTo(methodOn(ActivityController.class).findOne(activity.getId())).withSelfRel());
		links.add(linkTo(methodOn(ActivityController.class).findOrganisationByActivity(activity.getId())).withRel("organisation"));
		links.add(linkTo(methodOn(ActivityController.class).findUserByActivity(activity.getId())).withRel("user"));
		links.add(linkTo(methodOn(ActivityController.class).findCategoryByActivity(activity.getId())).withRel("category"));
		links.add(linkTo(methodOn(ActivityController.class).findSchedulesByActivity(activity.getId())).withRel("schedules"));
		links.add(linkTo(methodOn(ActivityController.class).findTagsByActivity(activity.getId())).withRel("tags"));
		links.add(linkTo(methodOn(ActivityController.class).findTargetGroupsByActivity(activity.getId())).withRel("targetgroups"));
		
		return links;
	}
	

}
