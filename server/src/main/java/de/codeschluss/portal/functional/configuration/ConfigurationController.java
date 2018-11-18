package de.codeschluss.portal.functional.configuration;

import static org.springframework.http.ResponseEntity.status;

import de.codeschluss.portal.core.common.CrudController;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;
import de.codeschluss.portal.core.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.configuration.ConfigurationEntity;

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

@RestController
public class ConfigurationController
    extends CrudController<ConfigurationEntity, ConfigurationService> {

  public ConfigurationController(ConfigurationService service) {
    super(service);
  }

  @Override
  @GetMapping("/configurations")
  public ResponseEntity<?> findAll(FilterSortPaginate params) {
    return super.findAll(params);
  }

  @Override
  @GetMapping("/configurations/{configurationId}")
  public Resource<ConfigurationEntity> findOne(@PathVariable String configurationId) {
    return super.findOne(configurationId);
  }

  @Override
  @PostMapping("/configurations")
  @SuperUserPermission
  public ResponseEntity<?> add(@RequestBody ConfigurationEntity newConfiguration)
      throws URISyntaxException {
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
