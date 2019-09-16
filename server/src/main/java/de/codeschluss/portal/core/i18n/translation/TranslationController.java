package de.codeschluss.portal.core.i18n.translation;

import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.i18n.entities.TranslationResult;
import de.codeschluss.portal.core.i18n.language.LanguageService;
import de.codeschluss.portal.core.security.permissions.Authenticated;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for translation specific tasks. 
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class TranslationController {
  
  /** The language service. */
  @Autowired
  private LanguageService languageService;
  
  /** The translation service. */
  @Autowired
  private TranslationService translationService;
  
  /**
   * Translate.
   *
   * @param params the params
   * @param labels the labels
   * @return the response entity
   */
  @PostMapping("/translations/translate")
  @Authenticated
  public ResponseEntity<List<TranslationResult>> translate(
      TranslationQueryParam params, 
      @RequestBody Map<String, String> labels) {
    if (!isValid(params, labels)) {
      throw new BadParamsException("Source or target languages do not exist");
    }
    return ResponseEntity.ok(translationService.translateAll(params,labels));
  }

  /**
   * Checks if is valid.
   *
   * @param params the params
   * @param labels the labels
   * @return true, if is valid
   */
  private boolean isValid(TranslationQueryParam params, Map<String, String> labels) {
    return params.getSource() != null && !params.getSource().isEmpty()
        && params.getTargets() != null && !params.getTargets().isEmpty()
        && languageService.existsByLocale(params.getSource()) 
        && languageService.existsByLocales(params.getTargets())
        && !labels.isEmpty();
  }
}
