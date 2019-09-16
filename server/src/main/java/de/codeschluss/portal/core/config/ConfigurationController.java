package de.codeschluss.portal.core.config;

import static org.springframework.http.ResponseEntity.status;

import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;

import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * The Class ConfigurationController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class ConfigurationController
    extends CrudController<ConfigurationEntity, ConfigurationService> {

  public ConfigurationController(ConfigurationService service) {
    super(service);
  }

  @Override
  @GetMapping("/configurations")
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    return super.readAll(params);
  }

  @Override
  @GetMapping("/configurations/{configurationId}")
  public Resource<ConfigurationEntity> readOne(@PathVariable String configurationId) {
    return super.readOne(configurationId);
  }

  @Override
  @PostMapping("/configurations")
  @SuperUserPermission
  public ResponseEntity<?> create(@RequestBody ConfigurationEntity newConfiguration)
      throws Exception {
    super.create(newConfiguration);
    return status(HttpStatus.METHOD_NOT_ALLOWED).build();
  }

  @Override
  @PutMapping("/configurations/{configurationId}")
  @SuperUserPermission
  public ResponseEntity<?> update(@RequestBody ConfigurationEntity newConfiguration,
      @PathVariable String configurationId) throws URISyntaxException {
    return super.update(newConfiguration, configurationId);
  }

  @Override
  @DeleteMapping("/configurations/{configurationId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String configurationId) {
    return super.delete(configurationId);
  }
}
