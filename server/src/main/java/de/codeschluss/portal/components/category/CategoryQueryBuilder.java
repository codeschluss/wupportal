package de.codeschluss.portal.components.category;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.category.QCategoryEntity;
import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class CategoryQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class CategoryQueryBuilder extends QueryBuilder<QCategoryEntity> {
  
  /**
   * Instantiates a new category query builder.
   */
  public CategoryQueryBuilder() {
    super(QCategoryEntity.categoryEntity);
  }
  
  /**
   * With name.
   *
   * @param name the name
   * @return the boolean expression
   */
  public BooleanExpression withName(String name) {
    return query.name.eq(name);
  }

  /**
   * With any activity id.
   *
   * @param activityId the activity id
   * @return the predicate
   */
  public Predicate withAnyActivityId(String activityId) {
    return query.activities.any().id.eq(activityId);
  }
  
  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common.
   * QueryBuilder#fuzzySearch(de.codeschluss.portal.core.utils.FilterSortPaginate)
   */
  @Override
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.name.likeIgnoreCase(filter)
        .or(query.description.likeIgnoreCase(filter));
  }
}
