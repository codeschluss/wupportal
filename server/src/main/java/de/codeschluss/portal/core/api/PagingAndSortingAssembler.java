package de.codeschluss.portal.core.api;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.api.dto.EmbeddedGraph;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.api.dto.ResourceWithEmbeddable;
import de.codeschluss.portal.core.api.dto.SortPaginate;
import de.codeschluss.portal.core.service.BaseEntity;

import java.beans.PropertyDescriptor;
import java.io.IOException;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

// TODO: Auto-generated Javadoc
/**
 * The Class PagingAndSortingAssembler.
 * 
 * @author Valmir Etemi
 * 
 * @param <E>
 *          the element type
 */
@Service
public abstract class PagingAndSortingAssembler<E extends BaseEntity>
    implements ResourceAssembler<E, Resource<E>> {

  @Override
  public Resource<E> toResource(E entity) {
    return new Resource<>(entity, createResourceLinks(entity));
  }

  /**
   * Entities to resources.
   *
   * @param <P>
   *          the generic type
   * @param entities
   *          the entities
   * @param params
   *          the params
   * @return the resources
   */
  public <P extends BaseParams> Resources<?> entitiesToResources(List<E> entities, P params) {
    try {
      EmbeddedGraph graph = createEmbeddingsFromParam(params);
      List<Resource<?>> entityResources = entities.parallelStream()
          .map(entity -> toResourceTest(entity, graph)).collect(Collectors.toList());
      return toListResources(entityResources, params);
    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return null;
  }

  /**
   * Creates the embeddings from param.
   *
   * @param params
   *          the params
   * @return the embedded graph
   * @throws JsonParseException
   *           the json parse exception
   * @throws JsonMappingException
   *           the json mapping exception
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   */
  private EmbeddedGraph createEmbeddingsFromParam(BaseParams params)
      throws JsonParseException, JsonMappingException, IOException {
    ObjectMapper mapper = new ObjectMapper();
    String decodedEmbeddding = new String(Base64Utils.decodeFromString(params.getEmbeddings()));
    return mapper.readValue(decodedEmbeddding, EmbeddedGraph.class);
  }

  /**
   * To resource test.
   *
   * @param entity
   *          the entity
   * @param embeddings
   *          the embeddings
   * @return the resource with embeddable
   */
  @Transactional
  public ResourceWithEmbeddable<?> toResourceTest(E entity, EmbeddedGraph embeddings) {
    try {
      List<Object> embeddables = new ArrayList<>();
      for (EmbeddedGraph node : embeddings.getNodes()) {
        E subEntity = (E) new PropertyDescriptor(node.getName(), entity.getClass()).getReadMethod()
            .invoke(entity);
        Object resource;
        if (node.getNodes() != null && !node.getNodes().isEmpty()) {
          resource = toResourceTest(subEntity, node);
        } else {
          resource = toResource(subEntity);
        }

        embeddables.add(resource);
      }

      return toResourceWithEmbedabble(entity, embeddables, embeddings.getName());
    } catch (Throwable e) {
      e.printStackTrace();
      return null;
    }

  }

  /**
   * To resource with embedabble.
   *
   * @param entity
   *          the entity
   * @param embeddable
   *          the embeddable
   * @param relationName
   *          the relation name
   * @return the resource with embeddable
   */
  public ResourceWithEmbeddable<E> toResourceWithEmbedabble(E entity, List<Object> embeddable,
      String relationName) {
    EmbeddedWrapper embedding = relationName == null || relationName.isEmpty()
        ? new EmbeddedWrappers(true).wrap(embeddable)
        : new EmbeddedWrappers(true).wrap(embeddable, relationName);

    return new ResourceWithEmbeddable<E>(entity, Arrays.asList(embedding),
        createResourceLinks(entity));
  }

  /**
   * To resource with embedabble.
   *
   * @param entity
   *          the entity
   * @param embeddable
   *          the embeddable
   * @param relationName
   *          the relation name
   * @return the resource with embeddable
   */
  public ResourceWithEmbeddable<E> toResourceWithEmbedabble(E entity, Object embeddable,
      String relationName) {
    EmbeddedWrapper embedding = relationName == null || relationName.isEmpty()
        ? new EmbeddedWrappers(true).wrap(embeddable)
        : new EmbeddedWrappers(true).wrap(embeddable, relationName);

    return new ResourceWithEmbeddable<E>(entity, Arrays.asList(embedding),
        createResourceLinks(entity));
  }

  /**
   * To list resources.
   *
   * @param <P>
   *          the generic type
   * @param content
   *          the content
   * @param params
   *          the params
   * @return the resources
   */
  public <P extends BaseParams> Resources<?> toListResources(List<? extends Resource<?>> content,
      P params) {
    return new Resources<>(content, PaginationLinkBuilder.createSelfLink(params));
  }

  /**
   * Entities to paged resources.
   *
   * @param entitiesPaged
   *          the entities paged
   * @param params
   *          the params
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
   * @param entities
   *          the entities
   * @param entitiesPaged
   *          the entities paged
   * @param links
   *          the links
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
   * @param entity
   *          the entity
   * @return the list
   */
  protected abstract List<Link> createResourceLinks(E entity);

  /**
   * Creates the paging links.
   *
   * @param params
   *          the params
   * @param entitiesPaged
   *          the entities paged
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
