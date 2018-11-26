package de.codeschluss.portal.core.common;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.utils.FilterSortPaginate;

/**
 * The Class QueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
public abstract class QueryBuilder {
  
  public abstract <P extends FilterSortPaginate> Predicate search(P params);
  
  protected String prepareFilter(String filter) {
    return "%" + filter + "%"; 
  }

}
