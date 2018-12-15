package de.codeschluss.portal.core.api;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.api.dto.EmbeddedGraph;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.api.dto.SortPaginate;
import de.codeschluss.portal.core.entity.BaseResource;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.data.domain.Page;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.PagedResources.PageMetadata;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: Auto-generated Javadoc
/**
 * The Class PagingAndSortingAssembler.
 * 
 * @author Valmir Etemi
 */
@Service
public class PagingAndSortingAssembler {

  private AssemblerHelper helper;

  public PagingAndSortingAssembler(AssemblerHelper helper) {
    this.helper = helper;
  }

  /**
   * Entities to resources.
   *
   * @param <P>
   *          the generic type
   * @param <E>
   *          the element type
   * @param result
   *          the result
   * @param params
   *          the params
   * @return the resources
   * @throws JsonParseException
   *           the json parse exception
   * @throws JsonMappingException
   *           the json mapping exception
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   */
  public <P extends BaseParams, E extends BaseResource> Resources<?> entitiesToResources(
      List<E> result, P params) throws JsonParseException, JsonMappingException, IOException {
    List<Resource<?>> entityResources = createResources(result.stream(), params);
    return toListResources(entityResources, params);
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
   * @param <E>
   *          the element type
   * @param result
   *          the result
   * @param params
   *          the params
   * @return the paged resources
   * @throws JsonParseException
   *           the json parse exception
   * @throws JsonMappingException
   *           the json mapping exception
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   */
  public <E extends BaseResource> PagedResources<Resource<?>> entitiesToPagedResources(
      Page<E> result, FilterSortPaginate params)
      throws JsonParseException, JsonMappingException, IOException {
    List<Resource<?>> entityResources = createResources(result.stream(), params);
    return toPagedResources(entityResources, result, params);
  }

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


  /**
   * To paged resources.
   *
   * @param <E> the element type
   * @param resources the resources
   * @param page the page
   * @param params the params
   * @return the paged resources
   */
  public <E extends BaseResource> PagedResources<Resource<?>> toPagedResources(
      List<Resource<?>> resources, Page<E> page, FilterSortPaginate params) {
    List<Link> links = createPagingLinks(params, page);
    return new PagedResources<Resource<?>>(resources, new PageMetadata(page.getSize(),
        page.getPageable().getPageNumber(), page.getTotalElements(), page.getTotalPages()), links);
  }

  /**
   * Creates the resources.
   *
   * @param <E>
   *          the element type
   * @param result
   *          the result
   * @param params
   *          the params
   * @return the list
   * @throws JsonParseException
   *           the json parse exception
   * @throws JsonMappingException
   *           the json mapping exception
   * @throws IOException
   *           Signals that an I/O exception has occurred.
   */
  private <E extends BaseResource> List<Resource<?>> createResources(Stream<E> result,
      BaseParams params) throws JsonParseException, JsonMappingException, IOException {
    if (params == null || params.getEmbeddings() == null || params.getEmbeddings().isEmpty()) {
      return result.map(this::toResource).collect(Collectors.toList());
    } else {
      List<EmbeddedGraph> graph = helper.createEmbeddingsFromParam(params);
      return result.map(entity -> toResourceWithEmbedabbles(entity, graph))
          .collect(Collectors.toList());
    }
  }

  /**
   * To resource with embedabbles.
   *
   * @param <E> the element type
   * @param entity the entity
   * @param embeddings the embeddings
   * @return the resource
   */
  @SuppressWarnings("unchecked")
  @Transactional
  public <E extends BaseResource> Resource<E> toResourceWithEmbedabbles(E entity,
      List<EmbeddedGraph> embeddings) {
    Map<String, Object> embeddables = new HashMap<>();
    for (EmbeddedGraph node : embeddings) {
      Object fieldValue = helper.getFieldValue(node.getName(), entity);
      if (fieldValue != null) {
        if (helper.isValidSubResource(fieldValue)) {
          E subEntity = (E) fieldValue;
          Object resource;
          if (node.getNodes() != null && !node.getNodes().isEmpty()) {
            resource = toResourceWithEmbedabbles(subEntity, node.getNodes());
          } else {
            resource = toResource(subEntity);
          }
          embeddables.put(node.getName(), resource);
        }
        if (helper.isValidSubList(fieldValue)) {
          List<?> subEntity = (List<?>) fieldValue;
          Object listResource = subEntity.stream().map(subRes -> toResource((E) subRes))
              .collect(Collectors.toList());
          embeddables.put(node.getName(), listResource);
        }
      }
    }
    return resourceWithEmbeddable(entity, embeddables);
  }

  /**
   * Resource with embeddable.
   *
   * @param <E>
   *          the element type
   * @param entity
   *          the entity
   * @param embeddables
   *          the embeddables
   * @return the resource
   */
  @SuppressWarnings("unchecked")
  public <E extends BaseResource> Resource<E> resourceWithEmbeddable(Object entity,
      Map<String, Object> embeddables) {
    return helper.resourceWithEmbeddable((E) entity, embeddables);
  }

  /**
   * To resource.
   *
   * @param entity
   *          the entity
   * @return the resource
   */
  @SuppressWarnings("unchecked")
  public <E extends BaseResource> Resource<E> toResource(E entity) {
    return (Resource<E>) helper.toResource(entity);
  }
}
