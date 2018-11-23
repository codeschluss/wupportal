package de.codeschluss.portal.components.translation;

import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.common.QueryBuilder;

import org.springframework.stereotype.Service;

@Service
public class TranslationQueryBuilder implements QueryBuilder {

  @Override
  public BooleanExpression fuzzySearch(String filter) {
    // TODO Auto-generated method stub
    return null;
  }

}
