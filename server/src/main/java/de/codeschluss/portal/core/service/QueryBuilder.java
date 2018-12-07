package de.codeschluss.portal.core.service;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.StringPath;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;

import java.util.List;

// TODO: Auto-generated Javadoc
/**
 * The Class QueryBuilder.
 *
 * @author Valmir Etemi
 * @param <T>
 *          the generic type
 */
public abstract class QueryBuilder<T> {

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
   * Search.
   *
   * @param <P>
   *          the generic type
   * @param params
   *          the params
   * @return the predicate
   */
  public abstract <P extends FilterSortPaginate> Predicate search(P params);

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
