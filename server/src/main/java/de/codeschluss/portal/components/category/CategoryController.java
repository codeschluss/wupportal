package de.codeschluss.portal.components.category;

import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.i18n.translation.TranslationService;
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
public class CategoryController extends CrudController<CategoryEntity, CategoryService> {
  
  /** The translation service. */
  private final TranslationService translationService;

  public CategoryController(
      CategoryService service,
      TranslationService translationService) {
    super(service);
    this.translationService = translationService;
  }

  @Override
  @GetMapping("/categories")
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    return super.readAll(params);
  }

  @Override
  @GetMapping("/categories/{categoryId}")
  public Resource<CategoryEntity> readOne(@PathVariable String categoryId) {
    return super.readOne(categoryId);
  }

  @Override
  @PostMapping("/categories")
  @SuperUserPermission
  public ResponseEntity<?> create(@RequestBody CategoryEntity newCategory) 
      throws URISyntaxException {
    return super.create(newCategory);
  }

  @Override
  @PutMapping("/categories/{categoryId}")
  @SuperUserPermission
  public ResponseEntity<?> update(@RequestBody CategoryEntity newCategory,
      @PathVariable String categoryId) throws URISyntaxException {
    return super.update(newCategory, categoryId);
  }

  @Override
  @DeleteMapping("/categories/{categoryId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String categoryId) {
    return super.delete(categoryId);
  }
  
  /**
   * Read translations.
   *
   * @param categoryId the category id
   * @return the response entity
   * @throws Throwable the throwable
   */
  @GetMapping("/categories/{categoryId}/translations")
  public ResponseEntity<?> readTranslations(@PathVariable String categoryId) {
    try {
      return ok(translationService.getAllTranslations(service.getById(categoryId), this));
    } catch (Throwable e) {
      throw new RuntimeException("Translations are not available");
    }
  }
}
