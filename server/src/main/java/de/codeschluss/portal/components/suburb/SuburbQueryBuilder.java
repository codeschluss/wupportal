package de.codeschluss.portal.components.suburb;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.suburb.QSuburbEntity;
import de.codeschluss.portal.core.common.QueryBuilder;

import org.springframework.stereotype.Service;

@Service
public class SuburbQueryBuilder implements QueryBuilder {

  private final QSuburbEntity query;
  
  public SuburbQueryBuilder() {
    this.query = QSuburbEntity.suburbEntity;
  }
  
  public BooleanExpression withName(String name) {
    return query.name.eq(name);
  }

  public Predicate withAnyAddressId(String activityId) {
    return query.addresses.any().id.eq(activityId);
  }
  
  public BooleanExpression fuzzySearch(String filter) {
    return query.name.likeIgnoreCase(filter);
  }
}
