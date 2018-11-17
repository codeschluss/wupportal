package de.codeschluss.portal.functional.organisation;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.core.common.PagingAndSortingAssembler;

@Service
public class OrganisationResourceAssembler extends PagingAndSortingAssembler<OrganisationEntity> {
	
	@Override
	protected List<Link> createResourceLinks(OrganisationEntity organisation) {
		List<Link> links = new ArrayList<Link>();
		
		links.add(linkTo(methodOn(OrganisationController.class).findOne(organisation.getId())).withSelfRel());
		links.add(linkTo(methodOn(OrganisationController.class).findActivities(organisation.getId())).withRel("activities"));
		links.add(linkTo(methodOn(OrganisationController.class).findUsersByOrganisation(organisation.getId())).withRel("users"));
		links.add(linkTo(methodOn(OrganisationController.class).findAddress(organisation.getId())).withRel("address"));
		
		return links;
	}
	

}
