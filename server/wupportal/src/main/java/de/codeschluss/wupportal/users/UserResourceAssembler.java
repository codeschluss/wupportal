package de.codeschluss.wupportal.users;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.PagedResources.PageMetadata;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.Resources;

import org.springframework.stereotype.Component;

import de.codeschluss.wupportal.model.Provider;

@Component
public class UserResourceAssembler implements ResourceAssembler<UserEntity, Resource<UserEntity>> {

	@Override
	public Resource<UserEntity> toResource(UserEntity user) {
		
		return new Resource<>(user,
				linkTo(methodOn(UserController.class).findOne(user.getId())).withSelfRel(),
				linkTo(methodOn(UserController.class).findProvidersByUser(user.getId())).withRel("providers"));
	}
	
	public Resources<Provider> toProviderResources(String id, List<Provider> providers) {
		return new Resources<>(providers,
				linkTo(methodOn(UserController.class).findProvidersByUser(id)).withSelfRel());
		
	}

	public PagedResources<Resource<UserEntity>> toResource(Page<UserEntity> usersPaged) {
		List<Resource<UserEntity>> users = usersPaged.stream().map(this::toResource).collect(Collectors.toList());
		return new PagedResources<Resource<UserEntity>>(users,
				new PageMetadata(usersPaged.getSize(), usersPaged.getPageable().getPageNumber(), usersPaged.getTotalElements(), usersPaged.getTotalPages()),
				linkTo(methodOn(UserController.class).findAll(null, null, null, null, null)).withSelfRel());
	}
	
	public Resources<UserEntity> toResource(List<UserEntity> users) {
		return new Resources<UserEntity>(users,
				linkTo(methodOn(UserController.class).findAll(null, null, null, null, null)).withSelfRel());
	}
}
