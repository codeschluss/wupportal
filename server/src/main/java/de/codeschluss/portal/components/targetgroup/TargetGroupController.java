package de.codeschluss.portal.components.targetgroup;

import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.i18n.translation.TranslationService;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
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
 * The Class TargetGroupController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class TargetGroupController extends CrudController<TargetGroupEntity, TargetGroupService> {

  /** The translation service. */
  private final TranslationService translationService;
  
  public TargetGroupController(
      TargetGroupService service,
      TranslationService translationService) {
    super(service);
    this.translationService = translationService;
  }

  @Override
  @GetMapping("/targetgroups")
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    return super.readAll(params);
  }

  @Override
  @GetMapping("/targetgroups/{targetGroupId}")
  public Resource<TargetGroupEntity> readOne(@PathVariable String targetGroupId) {
    return super.readOne(targetGroupId);
  }

  @Override
  @PostMapping("/targetgroups")
  @SuperUserPermission
  public ResponseEntity<?> create(@RequestBody TargetGroupEntity newTargetGroup)
      throws URISyntaxException {
    return super.create(newTargetGroup);
  }

  @Override
  @PutMapping("/targetgroups/{targetGroupId}")
  @SuperUserPermission
  public ResponseEntity<?> update(
      @RequestBody TargetGroupEntity newTargetGroup,
      @PathVariable String targetGroupId) throws URISyntaxException {
    return super.update(newTargetGroup, targetGroupId);
  }

  @Override
  @DeleteMapping("/targetgroups/{targetGroupId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String targetGroupId) {
    return super.delete(targetGroupId);
  }
  
  /**
   * Read translations.
   *
   * @param targetGroupId the target group id
   * @return the response entity
   */
  @GetMapping("/targetgroups/{targetGroupId}/translations")
  public ResponseEntity<?> readTranslations(@PathVariable String targetGroupId) {
    try {
      return ok(translationService.getAllTranslations(service.getById(targetGroupId), this));
    } catch (NoSuchMethodException | SecurityException | IllegalAccessException
        | IllegalArgumentException | InvocationTargetException | IOException e) {
      throw new RuntimeException(e.getMessage());
    }
  }
}
