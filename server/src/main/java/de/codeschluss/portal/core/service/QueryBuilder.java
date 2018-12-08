package de.codeschluss.portal.core.service;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringPath;

import de.codeschluss.portal.core.api.dto.CustomSort;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

// TODO: Auto-generated Javadoc
/**
 * The Class QueryBuilder.
 *
 * @author Valmir Etemi
 * @param <T>
 *          the generic type
 */
public abstract class QueryBuilder<T> {
  
  protected final String defaultSortProp = "id";

  /** The query. */
  protected final T query;

  /**
   * Instantiates a new query builder.
   *
   * @param query
   *          the query
   */
  public QueryBuilder(T query) {
    this.query = query;
  }
  
  /**
   * Creates the sort.
   *
   * @param <P> the generic type
   * @param sortParam the sort param
   * @return the sort
   */
  public <P extends CustomSort> Sort createSort(P sortParam) {
    Direction direction = getDirection(sortParam);
    String sort = getSort(sortParam);

    return new Sort(direction, sort);
  }

  /**
   * Gets the sort.
   *
   * @param <P> the generic type
   * @param sortParam the sort param
   * @return the sort
   */
  protected <P extends CustomSort> String getSort(P sortParam) {
    return sortParam == null || sortParam.getSort() == null || sortParam.getSort().isEmpty() 
        ? defaultSortProp 
        : prepareSort(sortParam.getSort());
  }

  /**
   * Prepare sort.
   *
   * @param sort the sort
   * @return the string
   */
  protected String prepareSort(String sort) {
    return sort;
  }

  /**
   * Gets the direction.
   *
   * @param <P> the generic type
   * @param sortParam the sort param
   * @return the direction
   */
  protected <P extends CustomSort> Direction getDirection(P sortParam) {
    return sortParam == null || sortParam.getDir() == null || isAsc(sortParam)
        ? Sort.Direction.ASC
        : Sort.Direction.DESC;
  }


  /**
   * Checks if is asc.
   *
   * @param sortParam the sort param
   * @return true, if is asc
   */
  protected <P extends CustomSort> boolean isAsc(P sortParam) {
    return sortParam.getDir().trim().toLowerCase().equals(
        Sort.Direction.ASC.toString().toLowerCase());
  }

  /**
   * Search.
   *
   * @param <P>
   *          the generic type
   * @param params
   *          the params
   * @return the predicate
   */
  public abstract <P extends FilterSortPaginate> Predicate search(P params);
  
  public boolean localized() {
    return false;
  }

  /**
   * With id.
   *
   * @param id
   *          the id
   * @return the predicate
   */
  public Predicate withId(String id) {
    return getId().eq(id);
  }

  /**
   * With ids in.
   *
   * @param ids
   *          the ids
   * @return the predicate
   */
  public Predicate withIdsIn(List<String> ids) {
    return getId().in(ids);
  }

  /**
   * Duck types the id field because changes are not possible in generated data of
   * QueryDSL classes.
   *
   * @return the id
   */
  private StringPath getId() {
    try {
      return (StringPath) query.getClass().getDeclaredField("id").get(query);
    } catch (IllegalArgumentException 
        | IllegalAccessException 
        | NoSuchFieldException
        | SecurityException e) {
      throw new RuntimeException(
          "Entity is missing id field for entity class: " + query.getClass());
    }
  }

  /**
   * Prepare filter.
   *
   * @param filter
   *          the filter
   * @return the string
   */
  protected String prepareFilter(String filter) {
    return "%" + filter + "%";
  }

}
