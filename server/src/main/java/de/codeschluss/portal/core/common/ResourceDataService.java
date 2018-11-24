package de.codeschluss.portal.core.common;

import de.codeschluss.portal.core.utils.FilterSortPaginate;

import java.util.List;

import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;

public abstract class ResourceDataService<E extends BaseEntity, B extends QueryBuilder> 
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
    return assembler.toResource(add(newEntity));
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
