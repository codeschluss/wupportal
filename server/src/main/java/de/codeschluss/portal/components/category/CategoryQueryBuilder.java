package de.codeschluss.portal.components.category;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.category.QCategoryEntity;

import org.springframework.stereotype.Service;

@Service
public class CategoryQueryBuilder {

  private final QCategoryEntity query;
  
  public CategoryQueryBuilder() {
    this.query = QCategoryEntity.categoryEntity;
  }
  
  public BooleanExpression isName(String name) {
    return query.name.eq(name);
  }

  public Predicate anyActivityId(String activityId) {
    return query.activities.any().id.eq(activityId);
  }
  
  public BooleanExpression fuzzySearchQuery(String filter) {
    return query.name.likeIgnoreCase(filter)
        .or(query.description.likeIgnoreCase(filter));
  }
}
