package de.codeschluss.portal.components.tag;

import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.i18n.translation.TranslationService;
import de.codeschluss.portal.core.security.permissions.ProviderOrSuperUserPermission;
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
 * The Class TagController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class TagController extends CrudController<TagEntity, TagService> {
  
  /** The translation service. */
  private final TranslationService translationService;

  public TagController(
      TagService service,
      TranslationService translationService) {
    super(service);
    this.translationService = translationService;
  }

  @Override
  @GetMapping("/tags")
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    return super.readAll(params);
  }

  @Override
  @GetMapping("/tags/{tagId}")
  public Resource<TagEntity> readOne(@PathVariable String tagId) {
    return super.readOne(tagId);
  }

  @Override
  @PostMapping("/tags")
  @ProviderOrSuperUserPermission
  public ResponseEntity<?> create(@RequestBody TagEntity newTag) throws URISyntaxException {
    return super.create(newTag);
  }

  @Override
  @PutMapping("/tags/{tagId}")
  @SuperUserPermission
  public ResponseEntity<?> update(@RequestBody TagEntity newTag, @PathVariable String tagId)
      throws URISyntaxException {
    return super.update(newTag, tagId);
  }

  @Override
  @DeleteMapping("/tags/{tagId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String tagId) {
    return super.delete(tagId);
  }
  
  /**
   * Read translations.
   *
   * @param tagId the tag id
   * @return the response entity
   */
  @GetMapping("/tags/{tagId}/translations")
  public ResponseEntity<?> readTranslations(@PathVariable String tagId) {
    try {
      return ok(translationService.getAllTranslations(service.getById(tagId), this));
    } catch (Throwable e) {
      throw new RuntimeException("Translations are not available");
    }
  }
}
