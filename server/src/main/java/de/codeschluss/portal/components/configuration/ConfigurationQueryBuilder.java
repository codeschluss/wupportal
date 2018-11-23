package de.codeschluss.portal.components.configuration;

import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.common.QueryBuilder;

import org.springframework.stereotype.Service;

@Service
public class ConfigurationQueryBuilder implements QueryBuilder {

  private final QConfigurationEntity query;
  
  public ConfigurationQueryBuilder() {
    this.query = QConfigurationEntity.configurationEntity;
  }

  public BooleanExpression withItem(String item) {
    return query.item.eq(item);
  }

  public BooleanExpression fuzzySearch(String filter) {
    return query.item.likeIgnoreCase(filter);
  }
  
}
