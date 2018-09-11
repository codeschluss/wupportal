package de.codeschluss.wupportal.base;

import java.lang.reflect.Method;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.Resources;

import de.codeschluss.wupportal.model.Provider;
import de.codeschluss.wupportal.user.UserEntity;

public interface PagingAndSortingAssembler<E extends BaseEntity> extends ResourceAssembler<E, Resource<E>> {
	
	Resources<Resource<UserEntity>> toResource(List<E> entity);
	
	PagedResources<Resource<E>> toResource(Page<E> paged);

	<S extends BaseEntity> Resources<S> toSubResources(String id, List<S> list, Resources<S> resources);
}
