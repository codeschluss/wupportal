package de.codeschluss.portal.core.common;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;

import de.codeschluss.portal.core.utils.FilterSortPaginate;
import de.codeschluss.portal.core.utils.PaginationLinkBuilder;
import de.codeschluss.portal.core.utils.ResourceWithEmbeddable;
import de.codeschluss.portal.core.utils.SortPaginate;

import org.springframework.hateoas.PagedResources.PageMetadata;
import org.springframework.hateoas.core.EmbeddedWrapper;
import org.springframework.hateoas.core.EmbeddedWrappers;

@Service
public abstract class PagingAndSortingAssembler<E extends BaseEntity> implements ResourceAssembler<E, Resource<E>> {

	public Resource<E> toResource(E entity) {
		return new Resource<>(entity, createResourceLinks(entity));
	}
	
	public ResourceWithEmbeddable<E> toResourceWithEmbedabble(E entity, Object embeddable, String relationName) {
		EmbeddedWrapper embedding = relationName == null || relationName.isEmpty()
				? new EmbeddedWrappers(false).wrap(embeddable)
				: new EmbeddedWrappers(false).wrap(embeddable, relationName);

		return new ResourceWithEmbeddable<E>(entity, Arrays.asList(embedding), createResourceLinks(entity));
	}

	public <P extends SortPaginate> Resources<?> entitiesToResources(List<E> entities, P params) {
		List<Resource<?>> entityResources = entities.stream().map(this::toResource).collect(Collectors.toList());
		return toListResources(entityResources, params);
	}

	public <P extends SortPaginate> Resources<?> toListResources(List<? extends Resource<?>> content, P params) {
		return new Resources<>(content, PaginationLinkBuilder.createSelfLink(params));
	}
	
	public PagedResources<Resource<E>> entitiesToPagedResources(Page<E> entitiesPaged, FilterSortPaginate params) {
		List<Resource<E>> entities = entitiesPaged.stream().map(this::toResource).collect(Collectors.toList());
		List<Link> links = createPagingLinks(params, entitiesPaged);
		return toPagedResources(entities, entitiesPaged, links);
	}
	
	public PagedResources<Resource<E>> toPagedResources(List<Resource<E>> entities, Page<E> entitiesPaged, List<Link> links) {
		return new PagedResources<Resource<E>>(entities,
				new PageMetadata(entitiesPaged.getSize(), entitiesPaged.getPageable().getPageNumber(),
						entitiesPaged.getTotalElements(), entitiesPaged.getTotalPages()),
				links);
	}
	
	protected abstract List<Link> createResourceLinks(E entity);
	
	protected List<Link> createPagingLinks(SortPaginate params, Page<?> entitiesPaged) {
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
