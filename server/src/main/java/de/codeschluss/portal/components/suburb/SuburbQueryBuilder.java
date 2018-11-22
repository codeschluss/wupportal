package de.codeschluss.portal.components.suburb;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.suburb.QSuburbEntity;

import org.springframework.stereotype.Service;

@Service
public class SuburbQueryBuilder {

  private final QSuburbEntity query;
  
  public SuburbQueryBuilder() {
    this.query = QSuburbEntity.suburbEntity;
  }
  
  public BooleanExpression isName(String name) {
    return query.name.eq(name);
  }

  public Predicate anyAddressId(String activityId) {
    return query.addresses.any().id.eq(activityId);
  }
  
  public BooleanExpression fuzzySearchQuery(String filter) {
    return query.name.likeIgnoreCase(filter);
  }
}
