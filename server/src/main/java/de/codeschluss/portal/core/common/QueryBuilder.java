package de.codeschluss.portal.core.common;

import com.querydsl.core.types.dsl.BooleanExpression;

public interface QueryBuilder {
  
  public BooleanExpression fuzzySearch(String filter);

}
