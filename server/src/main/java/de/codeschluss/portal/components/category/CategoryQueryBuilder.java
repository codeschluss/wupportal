package de.codeschluss.portal.components.category;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.category.QCategoryEntity;
import de.codeschluss.portal.core.common.QueryBuilder;

import org.springframework.stereotype.Service;

@Service
public class CategoryQueryBuilder implements QueryBuilder {

  private final QCategoryEntity query;
  
  public CategoryQueryBuilder() {
    this.query = QCategoryEntity.categoryEntity;
  }
  
  public BooleanExpression withName(String name) {
    return query.name.eq(name);
  }

  public Predicate withAnyActivityId(String activityId) {
    return query.activities.any().id.eq(activityId);
  }
  
  public BooleanExpression fuzzySearch(String filter) {
    return query.name.likeIgnoreCase(filter)
        .or(query.description.likeIgnoreCase(filter));
  }
}
