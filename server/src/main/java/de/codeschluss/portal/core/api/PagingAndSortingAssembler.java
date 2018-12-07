package de.codeschluss.portal.core.api;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.api.dto.ResourceWithEmbeddable;
import de.codeschluss.portal.core.api.dto.SortPaginate;
import de.codeschluss.portal.core.service.BaseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.PagedResources.PageMetadata;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.core.EmbeddedWrapper;
import org.springframework.hateoas.core.EmbeddedWrappers;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class PagingAndSortingAssembler.
 * 
 * @author Valmir Etemi
 * 
 * @param <E> the element type
 */
@Service
public abstract class PagingAndSortingAssembler<E extends BaseEntity>
    implements ResourceAssembler<E, Resource<E>> {

  /* (non-Javadoc)
   * @see org.springframework.hateoas.ResourceAssembler#toResource(java.lang.Object)
   */
  @Override
  public Resource<E> toResource(E entity) {
    return new Resource<>(entity, createResourceLinks(entity));
  }

  /**
   * To resource with embedabble.
   *
   * @param entity the entity
   * @param embeddable the embeddable
   * @param relationName the relation name
   * @return the resource with embeddable
   */
  public ResourceWithEmbeddable<E> toResourceWithEmbedabble(E entity, Object embeddable,
      String relationName) {
    EmbeddedWrapper embedding = relationName == null || relationName.isEmpty()
        ? new EmbeddedWrappers(false).wrap(embeddable)
        : new EmbeddedWrappers(false).wrap(embeddable, relationName);

    return new ResourceWithEmbeddable<E>(entity, Arrays.asList(embedding),
        createResourceLinks(entity));
  }

  /**
   * Entities to resources.
   *
   * @param <P> the generic type
   * @param entities the entities
   * @param params the params
   * @return the resources
   */
  public <P extends SortPaginate> Resources<?> entitiesToResources(List<E> entities, P params) {
    List<Resource<?>> entityResources = entities.stream().map(this::toResource)
        .collect(Collectors.toList());
    return toListResources(entityResources, params);
  }

  /**
   * To list resources.
   *
   * @param <P> the generic type
   * @param content the content
   * @param params the params
   * @return the resources
   */
  public <P extends SortPaginate> Resources<?> toListResources(List<? extends Resource<?>> content,
      P params) {
    return new Resources<>(content, PaginationLinkBuilder.createSelfLink(params));
  }

  /**
   * Entities to paged resources.
   *
   * @param entitiesPaged the entities paged
   * @param params the params
   * @return the paged resources
   */
  public PagedResources<Resource<E>> entitiesToPagedResources(Page<E> entitiesPaged,
      FilterSortPaginate params) {
    List<Resource<E>> entities = entitiesPaged.stream().map(this::toResource)
        .collect(Collectors.toList());
    List<Link> links = createPagingLinks(params, entitiesPaged);
    return toPagedResources(entities, entitiesPaged, links);
  }

  /**
   * To paged resources.
   *
   * @param entities the entities
   * @param entitiesPaged the entities paged
   * @param links the links
   * @return the paged resources
   */
  public PagedResources<Resource<E>> toPagedResources(List<Resource<E>> entities,
      Page<E> entitiesPaged, List<Link> links) {
    return new PagedResources<Resource<E>>(entities,
        new PageMetadata(entitiesPaged.getSize(), entitiesPaged.getPageable().getPageNumber(),
            entitiesPaged.getTotalElements(), entitiesPaged.getTotalPages()),
        links);
  }

  /**
   * Creates the resource links.
   *
   * @param entity the entity
   * @return the list
   */
  protected abstract List<Link> createResourceLinks(E entity);

  /**
   * Creates the paging links.
   *
   * @param params the params
   * @param entitiesPaged the entities paged
   * @return the list
   */
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
