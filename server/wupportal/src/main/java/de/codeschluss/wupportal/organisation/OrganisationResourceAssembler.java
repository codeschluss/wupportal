package de.codeschluss.wupportal.organisation;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;
import org.springframework.hateoas.Resource;

import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.PagingAndSortingAssembler;

@Service
public class OrganisationResourceAssembler extends PagingAndSortingAssembler<OrganisationEntity> {
	
	@Override
	public Resource<OrganisationEntity> toResource(OrganisationEntity organisation) {
		return new Resource<>(organisation,
				linkTo(methodOn(OrganisationController.class).findOne(organisation.getId())).withSelfRel());
	}


}
