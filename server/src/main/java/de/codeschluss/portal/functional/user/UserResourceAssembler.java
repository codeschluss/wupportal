package de.codeschluss.portal.functional.user;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.core.common.PagingAndSortingAssembler;

@Service
public class UserResourceAssembler extends PagingAndSortingAssembler<UserEntity> {
	
	@Override
	protected List<Link> createResourceLinks(UserEntity user) {
		List<Link> links = new ArrayList<Link>();
		
		links.add(linkTo(methodOn(UserController.class).findOne(user.getId())).withSelfRel());
		links.add(linkTo(methodOn(UserController.class).findOrganisations(user.getId())).withRel("organisations"));
		links.add(linkTo(methodOn(UserController.class).findActivities(user.getId())).withRel("activities"));
		
		return links;
	}


}
