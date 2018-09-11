package de.codeschluss.wupportal.user;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.PagedResources.PageMetadata;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;

import org.springframework.stereotype.Service;

import de.codeschluss.wupportal.base.BaseEntity;
import de.codeschluss.wupportal.base.PagingAndSortingAssembler;
import de.codeschluss.wupportal.exception.NotFoundException;

@Service
public class UserResourceAssembler implements PagingAndSortingAssembler<UserEntity> {

	@Override
	public Resource<UserEntity> toResource(UserEntity user) {
		try {
			return new Resource<>(user,
					linkTo(methodOn(UserController.class).findOne(user.getId())).withSelfRel(),
					linkTo(methodOn(UserController.class).findProvidersByUser(user.getId())).withRel("providers"));
		} catch (NotFoundException | NoSuchMethodException | SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public PagedResources<Resource<UserEntity>> toResource(Page<UserEntity> usersPaged) {
		List<Resource<UserEntity>> users = usersPaged.stream().map(this::toResource).collect(Collectors.toList());
		return new PagedResources<Resource<UserEntity>>(users,
				new PageMetadata(usersPaged.getSize(), usersPaged.getPageable().getPageNumber(), usersPaged.getTotalElements(), usersPaged.getTotalPages()),
				linkTo(methodOn(UserController.class).findAll(null, null, null, null, null)).withSelfRel());
	}
	
	public Resources<Resource<UserEntity>> toResource(List<UserEntity> users) {
		List<Resource<UserEntity>> usersResources = users.stream().map(this::toResource).collect(Collectors.toList());
		return new Resources<Resource<UserEntity>>(usersResources,
				linkTo(methodOn(UserController.class).findAll(null, null, null, null, null)).withSelfRel());
	}
	
	@Override
	public <S extends BaseEntity> Resources<S> toSubResources(String id, List<S> subEntities, Resources<S> resources) {
		return new Resources<>(subEntities,
				linkTo(resources).withSelfRel());
	}
}
