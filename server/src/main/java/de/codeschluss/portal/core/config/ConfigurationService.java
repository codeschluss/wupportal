package de.codeschluss.portal.core.config;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.service.ResourceDataService;

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
      PagingAndSortingAssembler assembler) {
    super(repo, entities, assembler);
  }

  @Override
  public ConfigurationEntity getExisting(ConfigurationEntity newConfiguration) {
    return repo.findOne(entities.withItem(newConfiguration.getItem())).orElse(null);
  }
  
  @Override
  public boolean validCreateFieldConstraints(ConfigurationEntity newConfiguration) {
    return validFields(newConfiguration);
  }
  
  @Override
  public boolean validUpdateFieldConstraints(ConfigurationEntity newConfiguration) {
    return validFields(newConfiguration);
  }

  /**
   * Valid fields.
   *
   * @param newConfiguration the new configuration
   * @return true, if successful
   */
  private boolean validFields(ConfigurationEntity newConfiguration) {
    return newConfiguration.getItem() != null && !newConfiguration.getItem().isEmpty()
        && newConfiguration.getValue() != null && !newConfiguration.getItem().isEmpty();
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
