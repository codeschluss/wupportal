package de.codeschluss.portal.functional.targetgroup;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.PagingAndSortingAssembler;

@Service
public class TargetGroupResourceAssembler extends PagingAndSortingAssembler<TargetGroupEntity> {
	
	@Override
	protected List<Link> createResourceLinks(TargetGroupEntity targetGroup) {
		List<Link> links = new ArrayList<Link>();
		
		links.add(linkTo(methodOn(TargetGroupController.class).findOne(targetGroup.getId())).withSelfRel());
		
		return links;
	}
}
