package de.codeschluss.portal.core.api;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.api.dto.EmbeddedGraph;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.api.dto.ResourceWithEmbeddable;
import de.codeschluss.portal.core.api.dto.SortPaginate;
import de.codeschluss.portal.core.entity.BaseResource;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.ManyToOne;

import org.springframework.data.domain.Page;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.PagedResources.PageMetadata;
import org.springframework.hateoas.Resource;
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
 */
@Service
public class PagingAndSortingAssembler {

  /**
   * Entities to resources.
   *
   * @param <P> the generic type
   * @param <E> the element type
   * @param result the result
   * @param params the params
   * @return the resources
   * @throws JsonParseException the json parse exception
   * @throws JsonMappingException the json mapping exception
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public <P extends BaseParams, E extends BaseResource> Resources<?> entitiesToResources(
      List<E> result, P params) throws JsonParseException, JsonMappingException, IOException {
    List<Resource<E>> entityResources = createResources(result.parallelStream(), params);
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
   * @param <E> the element type
   * @param result the result
   * @param params the params
   * @return the paged resources
   * @throws JsonParseException the json parse exception
   * @throws JsonMappingException the json mapping exception
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public <E extends BaseResource> PagedResources<Resource<E>> entitiesToPagedResources(
      Page<E> result, FilterSortPaginate params)
      throws JsonParseException, JsonMappingException, IOException {
    List<Resource<E>> entityResources = createResources(result.stream(), params);
    List<Link> links = createPagingLinks(params, result);
    return toPagedResources(entityResources, result, links);
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
   * @param <E>
   *          the element type
   * @param resources
   *          the resources
   * @param page
   *          the page
   * @param links
   *          the links
   * @return the paged resources
   */
  public <E extends BaseResource> PagedResources<Resource<E>> toPagedResources(
      List<Resource<E>> resources, Page<E> page, List<Link> links) {
    return new PagedResources<Resource<E>>(resources, new PageMetadata(page.getSize(),
        page.getPageable().getPageNumber(), page.getTotalElements(), page.getTotalPages()), links);
  }

  private <E extends BaseResource> List<Resource<E>> createResources(Stream<E> result,
      BaseParams params) throws JsonParseException, JsonMappingException, IOException {
    if (params == null || params.getEmbeddings() == null || params.getEmbeddings().isEmpty()) {
      return result.map(this::toResource).collect(Collectors.toList());
    } else {
      EmbeddedGraph graph = createEmbeddingsFromParam(params);
      return result.map(entity -> toResourceWithEmbedabbles(entity, graph))
          .collect(Collectors.toList());
    }
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
   * To resource with embedabbles.
   *
   * @param <E>
   *          the element type
   * @param entity
   *          the entity
   * @param embeddings
   *          the embeddings
   * @return the resource with embeddable
   */
  @SuppressWarnings("unchecked")
  @Transactional
  public <E extends BaseResource> ResourceWithEmbeddable<E> toResourceWithEmbedabbles(E entity,
      EmbeddedGraph embeddings) {
    List<Object> embeddables = new ArrayList<>();
    for (EmbeddedGraph node : embeddings.getNodes()) {
      Field field;
      Object fieldValue;
      try {
        field = entity.getClass().getDeclaredField(node.getName());
        fieldValue = new PropertyDescriptor(node.getName(), entity.getClass()).getReadMethod()
            .invoke(entity);
      } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException
          | IntrospectionException | NoSuchFieldException | SecurityException e) {
        break;
      }

      if (isValidSubResource(fieldValue, field)) {
        E subEntity = (E) fieldValue;
        Object resource;
        if (node.getNodes() != null && !node.getNodes().isEmpty()) {
          resource = toResourceWithEmbedabbles(subEntity, node);
        } else {
          resource = toResource(subEntity);
        }
        embeddables.add(resource);
      }
    }
    return toResourceWithSingleEmbedabble(entity, embeddables, embeddings.getName());
  }

  /**
   * Checks if is valid sub resource.
   *
   * @param fieldValue
   *          the field value
   * @param field
   *          the field
   * @return true, if is valid sub resource
   */
  private boolean isValidSubResource(Object fieldValue, Field field) {
    return fieldValue != null && field != null
        && BaseResource.class.isAssignableFrom(fieldValue.getClass())
        && field.getDeclaredAnnotation(ManyToOne.class) != null;
  }

  /**
   * To resource.
   *
   * @param <E>
   *          the element type
   * @param entity
   *          the entity
   * @return the resource
   */
  public <E extends BaseResource> Resource<E> toResource(E entity) {
    return entity.toResource();
  }

  /**
   * To resource with single embedabble.
   *
   * @param <E>
   *          the element type
   * @param entity
   *          the entity
   * @param embeddable
   *          the embeddable
   * @param relationName
   *          the relation name
   * @return the resource with embeddable
   */
  public <E extends BaseResource> ResourceWithEmbeddable<E> toResourceWithSingleEmbedabble(E entity,
      Object embeddable, String relationName) {
    EmbeddedWrapper embedding = relationName == null || relationName.isEmpty()
        ? new EmbeddedWrappers(true).wrap(embeddable)
        : new EmbeddedWrappers(true).wrap(embeddable, relationName);

    return new ResourceWithEmbeddable<E>(entity, Arrays.asList(embedding));
  }
}
