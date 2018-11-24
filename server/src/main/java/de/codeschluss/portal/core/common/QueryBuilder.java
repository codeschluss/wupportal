package de.codeschluss.portal.core.common;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.utils.FilterSortPaginate;

public abstract class QueryBuilder {
  
  public abstract <P extends FilterSortPaginate> Predicate search(P params);
  
  protected String prepareFilter(String filter) {
    return "%" + filter + "%"; 
  }

}
