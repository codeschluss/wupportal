package de.codeschluss.portal.functional.tag;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.core.common.PagingAndSortingAssembler;

@Service
public class TagResourceAssembler extends PagingAndSortingAssembler<TagEntity> {

	@Override
	protected List<Link> createResourceLinks(TagEntity tag) {
		List<Link> links = new ArrayList<Link>();
		
		links.add(linkTo(methodOn(TagController.class).findOne(tag.getId())).withSelfRel());
		
		return links;
	}
}
