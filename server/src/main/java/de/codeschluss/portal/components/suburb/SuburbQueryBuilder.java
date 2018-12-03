package de.codeschluss.portal.components.suburb;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.suburb.QSuburbEntity;
import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import org.springframework.stereotype.Service;

/**
 * The Class SuburbQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class SuburbQueryBuilder extends QueryBuilder<QSuburbEntity> {
  
  public SuburbQueryBuilder() {
    super(QSuburbEntity.suburbEntity);
  }
  
  public BooleanExpression withName(String name) {
    return query.name.eq(name);
  }

  public Predicate withAnyAddressId(String activityId) {
    return query.addresses.any().id.eq(activityId);
  }
  
  @Override
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.name.likeIgnoreCase(filter);
  }
}
