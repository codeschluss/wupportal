package de.codeschluss.portal.functional.organisation;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.PagingAndSortingAssembler;

@Service
public class OrganisationResourceAssembler extends PagingAndSortingAssembler<OrganisationEntity> {
	
	@Override
	public Resource<OrganisationEntity> toResource(OrganisationEntity organisation) {
		return new Resource<>(organisation,
				createLinks(organisation));
	}
	
	private List<Link> createLinks(OrganisationEntity organisation) {
		List<Link> links = new ArrayList<Link>();
		
		links.add(linkTo(methodOn(OrganisationController.class).findOne(organisation.getId())).withSelfRel());
		
		return links;
	}
}
