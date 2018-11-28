package de.codeschluss.portal.components.configuration;

import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.common.QueryBuilder;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import org.springframework.stereotype.Service;

/**
 * The Class ConfigurationQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class ConfigurationQueryBuilder extends QueryBuilder {

  private final QConfigurationEntity query;
  
  public ConfigurationQueryBuilder() {
    this.query = QConfigurationEntity.configurationEntity;
  }

  public BooleanExpression withItem(String item) {
    return query.item.eq(item);
  }

  @Override
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.item.likeIgnoreCase(filter);
  }
  
}
