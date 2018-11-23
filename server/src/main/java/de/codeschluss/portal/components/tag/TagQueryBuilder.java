package de.codeschluss.portal.components.tag;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.components.tag.QTagEntity;
import de.codeschluss.portal.core.common.QueryBuilder;

import org.springframework.stereotype.Service;

@Service
public class TagQueryBuilder implements QueryBuilder {

  private final QTagEntity query;
  
  public TagQueryBuilder() {
    this.query = QTagEntity.tagEntity;
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
