package de.codeschluss.wupportal.base;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;

import de.codeschluss.wupportal.utils.FilterSortPaginate;
import de.codeschluss.wupportal.utils.PaginationLinkBuilder;

import org.springframework.hateoas.PagedResources.PageMetadata;

public abstract class PagingAndSortingAssembler<E extends BaseEntity> implements ResourceAssembler<E, Resource<E>> {

	public Resource<E> toResource(E entity) {
		return new Resource<>(entity);
	}

	public Resources<Resource<E>> toListResource(List<E> entities, ResponseEntity<?> responseEntity) {
		List<Resource<E>> entityResources = entities.stream().map(this::toResource).collect(Collectors.toList());
		return new Resources<Resource<E>>(entityResources, linkTo(responseEntity).withSelfRel());
	}

	public <S extends BaseEntity> Resources<S> toSubResource(List<S> subEntities, ResponseEntity<?> responseEntity) {
		return new Resources<>(subEntities, linkTo(responseEntity).withSelfRel());
	}
	
	public PagedResources<Resource<E>> toPageResource(FilterSortPaginate params, Page<E> entitiesPaged) {
		List<Resource<E>> entities = entitiesPaged.stream().map(this::toResource).collect(Collectors.toList());
		List<Link> links = createPagingLinks(params, entitiesPaged);
		return new PagedResources<Resource<E>>(entities,
				new PageMetadata(entitiesPaged.getSize(), entitiesPaged.getPageable().getPageNumber(),
						entitiesPaged.getTotalElements(), entitiesPaged.getTotalPages()),
				links);
	}

	public <S extends BaseEntity> PagedResources<Resource<S>> toPagedSubResource(FilterSortPaginate params, Page<S> subEntitiesPaged) {
		List<Resource<S>> subEntities = subEntitiesPaged.stream().map(entity -> new Resource<S>(entity)).collect(Collectors.toList());
		List<Link> links = createPagingLinks(params, subEntitiesPaged);
		return new PagedResources<Resource<S>>(subEntities,
				new PageMetadata(subEntitiesPaged.getSize(), subEntitiesPaged.getPageable().getPageNumber(),
						subEntitiesPaged.getTotalElements(), subEntitiesPaged.getTotalPages()),
				links);
	}
	
	private List<Link> createPagingLinks(FilterSortPaginate params, Page<?> entitiesPaged) {
		List<Link> links = new ArrayList<>();

		links.add(PaginationLinkBuilder.createFirstLink(params));
		if (entitiesPaged.hasPrevious()) {
			links.add(PaginationLinkBuilder.createPrevLink(params, entitiesPaged.previousPageable()));
		}
		links.add(PaginationLinkBuilder.createSelfLink(params));
		if (entitiesPaged.hasNext()) {
			links.add(PaginationLinkBuilder.createNextLink(params, entitiesPaged.nextPageable()));
		}
		links.add(PaginationLinkBuilder.createLastLink(params, entitiesPaged));
		
		return links;
	}
}
