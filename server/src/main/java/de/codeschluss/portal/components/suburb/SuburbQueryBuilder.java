package de.codeschluss.portal.components.suburb;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.suburb.QSuburbEntity;
import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import org.springframework.stereotype.Service;

@Service
public class SuburbQueryBuilder extends QueryBuilder {

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
  
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.name.likeIgnoreCase(filter);
  }
}
