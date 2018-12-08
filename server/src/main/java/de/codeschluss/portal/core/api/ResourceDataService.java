package de.codeschluss.portal.core.api;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.service.BaseEntity;
import de.codeschluss.portal.core.service.DataRepository;
import de.codeschluss.portal.core.service.DataService;
import de.codeschluss.portal.core.service.QueryBuilder;

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
public abstract class ResourceDataService<E extends BaseEntity, B extends QueryBuilder<?>> 
    extends DataService<E, B> {

  /** The assembler. */
  protected final PagingAndSortingAssembler<E> assembler;
  
  public ResourceDataService(
      DataRepository<E> repo, 
      B entities,
      PagingAndSortingAssembler<E> assembler) {
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
   * @param newEntity the new entity
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
  
  /**
   * Gets the sorted list resources.
   *
   * @param <P>
   *          the generic type
   * @param params
   *          the params
   * @return the sorted list resources
   */
  public <P extends FilterSortPaginate> Resources<?> getSortedListResources(P params) {
    List<E> result = getSortedList(params);
    return assembler.entitiesToResources(result, params);
  }
  
  /**
   * Gets the paged resources.
   *
   * @param <P>
   *          the generic type
   * @param params
   *          the params
   * @return the paged resources
   */
  public <P extends FilterSortPaginate> PagedResources<Resource<E>> getPagedResources(P params) {
    return assembler.entitiesToPagedResources(getPaged(params), params);
  }

}
