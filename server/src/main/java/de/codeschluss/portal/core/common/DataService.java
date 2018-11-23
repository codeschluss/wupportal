package de.codeschluss.portal.core.common;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

// TODO: Auto-generated Javadoc
/**
 * The Class DataService.
 *
 * @param <E>
 *          the element type
 * @param <R>
 *          the generic type
 */
public abstract class DataService<E extends BaseEntity, B extends QueryBuilder> {

  /** The repo. */
  protected final DataRepository<E> repo;

  /** The default sort prop. */
  protected final String defaultSortProp = "id";
  
  protected final B entities;

  /**
   * Instantiates a new data service.
   *
   * @param repo
   *          the repo
   */
  public DataService(
      DataRepository<E> repo,
      B entities) {
    this.repo = repo;
    this.entities = entities;
  }

  /**
   * Exists by id.
   *
   * @param id
   *          the address id
   * @return true, if successful
   */
  public boolean existsById(String id) {
    return repo.existsById(id);
  }
  
  /**
   * Gets the existing.
   *
   * @param newEntity
   *          the new entity
   * @return the existing
   */
  public abstract E getExisting(E newEntity);

  /**
   * Gets the by id.
   *
   * @param id
   *          the id
   * @return the by id
   */
  public E getById(String id) {
    return repo.findById(id).orElseThrow(() -> new NotFoundException(id));
  }

  /**
   * Gets the by ids.
   *
   * @param entityIds
   *          the entity ids
   * @return the by ids
   */
  public List<E> getByIds(List<String> entityIds) {
    return repo.findByIdIn(entityIds)
        .orElseThrow(() -> new NotFoundException(entityIds.toString()));
  }



  /**
   * Adds the.
   *
   * @param newEntity
   *          the new entity
   * @return the e
   */
  public E add(E newEntity) {
    E duplicate = getExisting(newEntity);
    return duplicate != null ? duplicate : repo.save(newEntity);
  }

  /**
   * Adds the all.
   *
   * @param newEntities
   *          the new entities
   * @return the list
   */
  public List<E> addAll(List<E> newEntities) {
    return newEntities.stream().map(entity -> {
      E duplicate = getExisting(entity);
      return duplicate != null ? duplicate : repo.save(entity);
    }).collect(Collectors.toList());
  }

  /**
   * Update.
   *
   * @param id
   *          the id
   * @param updatedEntity
   *          the updated entity
   * @return the e
   */
  public abstract E update(String id, E updatedEntity);

  /**
   * Delete.
   *
   * @param id
   *          the id
   */
  public void delete(String id) {
    repo.deleteById(id);
  }

  /**
   * Gets the sorted list.
   *
   * @param filter
   *          the filter
   * @param sort
   *          the sort
   * @return the sorted list
   */
  public List<E> getSortedList(String filter, Sort sort) {
    List<E> result =  filter == null 
        ? repo.findAll(sort)
        : repo.findAll(getFilteredPredicate(filter), sort);
    
    if (result == null || result.isEmpty()) {
      throw new NotFoundException(filter);
    }
    
    return result;
  }

  /**
   * Gets the paged.
   *
   * @param filter
   *          the filter
   * @param page
   *          the page
   * @return the paged
   */
  public Page<E> getPaged(String filter, PageRequest page) {
    Page<E> paged = filter == null ? repo.findAll(page)
        : repo.findAll(getFilteredPredicate(filter), page);
    
    if (paged == null || paged.isEmpty()) {
      throw new NotFoundException(filter);
    }
    
    return paged;
  }

  /**
   * Gets the sort.
   *
   * @param params
   *          the params
   * @return the sort
   */
  protected Sort getSort(FilterSortPaginate params) {
    return params.createSort(defaultSortProp);
  }

  protected Predicate getFilteredPredicate(String filter) {
    return this.entities.fuzzySearch(prepareFilter(filter));
  }
  
  protected String prepareFilter(String filter) {
    return "%" + filter + "%"; 
  }
}
