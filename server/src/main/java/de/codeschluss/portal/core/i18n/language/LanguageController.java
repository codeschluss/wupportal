package de.codeschluss.portal.core.i18n.language;

import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;

import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * The Class LanguageController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class LanguageController extends CrudController<LanguageEntity, LanguageService> {

  public LanguageController(LanguageService service) {
    super(service);
  }

  @Override
  @GetMapping("/languages")
  public ResponseEntity<?> findAll(FilterSortPaginate params) {
    return super.findAll(params);
  }

  @Override
  @GetMapping("/languages/{languageId}")
  public Resource<LanguageEntity> findOne(@PathVariable String languageId) {
    return super.findOne(languageId);
  }

  @Override
  @PostMapping("/languages")
  @SuperUserPermission
  public ResponseEntity<?> add(@RequestBody LanguageEntity newLanguage) throws URISyntaxException {
    return super.add(newLanguage);
  }

  @Override
  @PutMapping("/languages/{languageId}")
  @SuperUserPermission
  public ResponseEntity<?> update(@RequestBody LanguageEntity newLanguage,
      @PathVariable String languageId) throws URISyntaxException {
    return super.update(newLanguage, languageId);
  }

  @Override
  @DeleteMapping("/languages/{languageId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String languageId) {
    return super.delete(languageId);
  }
}
