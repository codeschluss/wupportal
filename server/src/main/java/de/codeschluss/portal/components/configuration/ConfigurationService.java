package de.codeschluss.portal.components.configuration;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.common.DataService;

import org.springframework.stereotype.Service;

@Service
public class ConfigurationService
    extends DataService<ConfigurationEntity> {
  
  private final ConfigurationQueryBuilder queryBuilder;

  public ConfigurationService(
      ConfigurationRepository repo,
      ConfigurationResourceAssembler assembler,
      ConfigurationQueryBuilder queryBuilder) {
    super(repo, assembler);
    this.queryBuilder = queryBuilder;
  }

  @Override
  public ConfigurationEntity getExisting(ConfigurationEntity newConfiguration) {
    return repo.findOne(queryBuilder.isItem(newConfiguration.getItem())).orElse(null);
  }

  @Override
  public ConfigurationEntity update(String id, ConfigurationEntity newConfiguration) {
    return repo.findById(id).map(category -> {
      category.setItem(newConfiguration.getItem());
      category.setValue(newConfiguration.getValue());
      return repo.save(category);
    }).orElseGet(() -> {
      newConfiguration.setId(id);
      return repo.save(newConfiguration);
    });
  }

  @Override
  protected Predicate getFilteredPredicate(String filter) {
    filter = prepareFilter(filter);
    return queryBuilder.fuzzySearchQuery(filter);
  }
}
