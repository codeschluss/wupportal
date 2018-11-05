package de.codeschluss.portal.functional.user;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;
import org.springframework.hateoas.Resource;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.common.base.PagingAndSortingAssembler;

@Service
public class UserResourceAssembler extends PagingAndSortingAssembler<UserEntity> {
	
	@Override
	public Resource<UserEntity> toResource(UserEntity user) {
		return new Resource<>(user,
				linkTo(methodOn(UserController.class).findOne(user.getId())).withSelfRel(),
				linkTo(methodOn(UserController.class).findOrganisationsByUser(user.getId())).withRel("organisations"),
				linkTo(methodOn(UserController.class).findActivitiesByUser(user.getId())).withRel("activities"),
				linkTo(methodOn(UserController.class).grantSuperuserRight(user.getId(), null)).withRel("grant/take superuser"));
	}


}
