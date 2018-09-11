package de.codeschluss.wupportal.user;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;
import org.springframework.hateoas.Resource;

import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.PagingAndSortingAssembler;

@Service
public class UserResourceAssembler extends PagingAndSortingAssembler<UserEntity> {
	
	@Override
	public Resource<UserEntity> toResource(UserEntity user) {
		return new Resource<>(user,
				linkTo(methodOn(UserController.class).findOne(user.getId())).withSelfRel(),
				linkTo(methodOn(UserController.class).findProvidersByUser(user.getId())).withRel("providers"));
	}


}
