package de.codeschluss.wupportal.base;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.hateoas.PagedResources.PageMetadata;

public abstract class PagingAndSortingAssembler<E extends BaseEntity> implements ResourceAssembler<E, Resource<E>> {
	
	public Resource<E> toResource(E entity) {
		return null;
	}

	public PagedResources<Resource<E>> toPageResource(Page<E> entitiesPaged, ResponseEntity<?> responseEntity) {
		List<Resource<E>> entities = entitiesPaged.stream().map(this::toResource).collect(Collectors.toList());
		return new PagedResources<Resource<E>>(entities,
				new PageMetadata(entitiesPaged.getSize(), entitiesPaged.getPageable().getPageNumber(), entitiesPaged.getTotalElements(), entitiesPaged.getTotalPages()),
				linkTo(responseEntity).withSelfRel());
	}
	
	public Resources<Resource<E>> toListResource(List<E> entities, ResponseEntity<?> responseEntity) {
		List<Resource<E>> entityResources = entities.stream().map(this::toResource).collect(Collectors.toList());
		return new Resources<Resource<E>>(entityResources,
				linkTo(responseEntity).withSelfRel());
	}
	
	public <S extends BaseEntity> Resources<S> toSubResources(String id, List<S> subEntities, Resources<S> resources) {
		return new Resources<>(subEntities,
				linkTo(resources).withSelfRel());
	}
}
