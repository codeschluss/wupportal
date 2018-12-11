package de.codeschluss.portal.core.service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.entity.BaseResource;
import de.codeschluss.portal.core.repository.DataRepository;

import java.io.IOException;
import java.util.List;

import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;

/**
 * The Class ResourceDataService.
 * 
 * @author Valmir Etemi
 *
 */
public abstract class ResourceDataService<E extends BaseResource, B extends QueryBuilder<?>>
    extends DataService<E, B> {

  /** The assembler. */
  protected final PagingAndSortingAssembler assembler;

  public ResourceDataService(DataRepository<E> repo, B entities,
      PagingAndSortingAssembler assembler) {
    super(repo, entities);
    this.assembler = assembler;
  }

  /**
   * Gets the resource by id.
   *
   * @param id
   *          the id
   * @return the resource by id
   */
  public Resource<E> getResourceById(String id) {
    return assembler.toResource(getById(id));
  }

  /**
   * Adds the resource.
   *
   * @param newEntity
   *          the new entity
   * @return the resource
   */
  public Resource<E> addResource(E newEntity) {
    return convertToResource(add(newEntity));
  }

  /**
   * Convert to resource.
   *
   * @param newEntity
   *          the new entity
   * @return the resource
   */
  public Resource<E> convertToResource(E newEntity) {
    return assembler.toResource(newEntity);
  }

  /**
   * Update resource.
   *
   * @param id
   *          the id
   * @param updatedEntity
   *          the updated entity
   * @return the resource
   */
  public Resource<E> updateResource(String id, E updatedEntity) {
    return assembler.toResource(update(id, updatedEntity));
  }

  public <P extends FilterSortPaginate> Resources<?> getSortedListResources(P params) 
      throws JsonParseException, JsonMappingException, IOException {
    List<E> result = getSortedList(params);
    return assembler.entitiesToResources(result, params);
  }

  public <P extends FilterSortPaginate> PagedResources<Resource<E>> getPagedResources(P params) 
      throws JsonParseException, JsonMappingException, IOException {
    return assembler.entitiesToPagedResources(getPaged(params), params);
  }

}
