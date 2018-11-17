package de.codeschluss.portal.functional.suburb;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.core.common.PagingAndSortingAssembler;
import de.codeschluss.portal.functional.address.AddressController;

@Service
public class SuburbResourceAssembler extends PagingAndSortingAssembler<SuburbEntity> {

	@Override
	protected List<Link> createResourceLinks(SuburbEntity suburb) {
		List<Link> links = new ArrayList<Link>();
		
		links.add(linkTo(methodOn(AddressController.class).findOne(suburb.getId())).withSelfRel());
		
		return links;
	}
}
