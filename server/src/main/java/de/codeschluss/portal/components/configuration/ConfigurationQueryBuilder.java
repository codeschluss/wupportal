package de.codeschluss.portal.components.configuration;

import com.querydsl.core.types.dsl.BooleanExpression;

import org.springframework.stereotype.Service;

@Service
public class ConfigurationQueryBuilder {

  private final QConfigurationEntity query;
  
  public ConfigurationQueryBuilder() {
    this.query = QConfigurationEntity.configurationEntity;
  }

  public BooleanExpression isItem(String item) {
    return query.item.eq(item);
  }

  public BooleanExpression fuzzySearchQuery(String filter) {
    return query.item.likeIgnoreCase(filter);
  }
  
}
