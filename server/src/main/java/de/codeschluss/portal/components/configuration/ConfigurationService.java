package de.codeschluss.portal.components.configuration;

import de.codeschluss.portal.core.common.ResourceDataService;

import org.springframework.stereotype.Service;

/**
 * The Class ConfigurationService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class ConfigurationService
    extends ResourceDataService<ConfigurationEntity, ConfigurationQueryBuilder> {

  public ConfigurationService(
      ConfigurationRepository repo,
      ConfigurationQueryBuilder entities,
      ConfigurationResourceAssembler assembler) {
    super(repo, entities, assembler);
  }

  @Override
  public ConfigurationEntity getExisting(ConfigurationEntity newConfiguration) {
    return repo.findOne(entities.withItem(newConfiguration.getItem())).orElse(null);
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
}
