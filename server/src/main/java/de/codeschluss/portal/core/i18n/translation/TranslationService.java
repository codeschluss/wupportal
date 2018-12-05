package de.codeschluss.portal.core.i18n.translation;

import de.codeschluss.portal.core.appconfig.TranslationsConfig;
import de.codeschluss.portal.core.common.CrudController;
import de.codeschluss.portal.core.common.DataRepository;
import de.codeschluss.portal.core.i18n.entities.LocalizedEntity;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;
import de.codeschluss.portal.core.i18n.language.LanguageService;
import de.codeschluss.portal.core.utils.RepositoryService;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import org.aspectj.lang.annotation.Around;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

// TODO: Auto-generated Javadoc
/**
 * The Class TranslationService.
 * 
 * @author Valmir Etemi
 */
@Service
public class TranslationService {

  /** The repo service. */
  private final RepositoryService repoService;

  /** The language service. */
  private LanguageService languageService;

  /** The assembler. */
  private final TranslationResourceAssembler assembler;
  
  private final TranslationsConfig config;
  
  /** The translation client. */
  private WebClient translationClient;
  
  /**
   * Instantiates a new translation service.
   *
   * @param repoService the repo service
   * @param languageService the language service
   * @param assembler the assembler
   */
  public TranslationService(
      RepositoryService repoService,
      LanguageService languageService,
      TranslationResourceAssembler assembler,
      TranslationsConfig config) {
    this.repoService = repoService;
    this.languageService = languageService;
    this.assembler = assembler;
    this.config = config;
    
    this.translationClient = WebClient
        .builder()
          .baseUrl("http://localhost:8080")
          .defaultCookie("cookieKey", "cookieValue")
//          .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE) 
//          .defaultUriVariables(Collections.singletonMap("url", "http://localhost:8080"))
        .build(); 
  }

  /**
   * Localize list.
   *
   * @param list the list
   */
  public void localizeList(List<?> list) throws Throwable {
    List<String> locales = languageService.getCurrentReadLocales();
    for (Object entity : list) {
      localizeEntity(entity, locales);
    }
  }

  public void localizeSingle(Object entity) throws Throwable {
    localizeEntity(entity, languageService.getCurrentReadLocales());
  }
  
  /**
   * Localize entity.
   *
   * @param entity the entity
   * @param locales the locales
   * @throws Throwable the throwable
   */
  private void localizeEntity(Object entity, List<String> locales) throws Throwable {
    for (String locale : locales) {
      boolean isTouched = TranslationHelper.localize(entity, locale);
      if (isTouched) {
        return;
      }
    }
    TranslationHelper.localize(entity, languageService.getDefaultLocale());
  }

  /**
   * Save.
   *
   * @param <E> the element type
   * @param savedEntity the saved entity
   * @throws Throwable the throwable
   */
  @SuppressWarnings("unchecked")
  @Around("save()")
  public <E extends LocalizedEntity<?>> void save(Object savedEntity)
      throws Throwable {
    TranslatableEntity<?> translatableObject = createTranslatableObject(
        (E) savedEntity, languageService.getCurrentWriteLanguage());
    repoService.save(translatableObject);
  }

  /**
   * Creates the translatable object.
   *
   * @param translatableClass
   *          the translatable class
   * @param savedEntity
   *          the saved entity
   * @return the object
   * @throws Throwable
   *           the throwable
   */
  private TranslatableEntity<?> createTranslatableObject(LocalizedEntity<?> savedEntity,
      LanguageEntity lang) throws Throwable {

    Class<TranslatableEntity<?>> translatableClass = TranslationHelper
        .getTranslatableType(savedEntity);

    TranslatableEntity<?> translatableObject = getTranslatableInstance(translatableClass, lang,
        savedEntity);

    TranslationHelper.setTranslations(translatableObject, savedEntity, lang);

    return translatableObject;
  }

  /**
   * Gets the translatable instance.
   *
   * @param <T>
   *          the generic type
   * @param translatableClass
   *          the translatable class
   * @param currentWriteLanguage
   *          the current write language
   * @param parent
   *          the parent
   * @return the translatable instance
   * @throws Throwable
   *           the throwable
   */
  @SuppressWarnings("unchecked")
  private <T extends TranslatableEntity<?>> T getTranslatableInstance(
      Class<TranslatableEntity<?>> translatableClass, LanguageEntity currentWriteLanguage,
      Object parent) throws Throwable {
    DataRepository<T> repo = repoService.getRepository(translatableClass);
    if (repo instanceof TranslationRepository<?>) {
      TranslationRepository<?> translationRepo = (TranslationRepository<?>) repo;
      Method findByLanguageAndParent = translationRepo.getClass().getMethod(
          "findByLanguageAndParent", LanguageEntity.class, parent.getClass().getSuperclass());

      T existingTranslatable = (T) findByLanguageAndParent.invoke(translationRepo,
          currentWriteLanguage, parent);

      return existingTranslatable != null ? existingTranslatable
          : (T) translatableClass.newInstance();
    }
    throw new RuntimeException(
        "Repository of Translation must inherit from " + TranslationRepository.class);
  }

  /**
   * Gets the all translations.
   *
   * @param parent the parent
   * @param controller the controller
   * @return the all translations
   * @throws NoSuchMethodException the no such method exception
   * @throws SecurityException the security exception
   * @throws IllegalAccessException the illegal access exception
   * @throws IllegalArgumentException the illegal argument exception
   * @throws InvocationTargetException the invocation target exception
   */
  @SuppressWarnings("unchecked")
  public Resources<?> getAllTranslations(LocalizedEntity<?> parent, CrudController<?, ?> controller)
      throws NoSuchMethodException, SecurityException, IllegalAccessException,
      IllegalArgumentException, InvocationTargetException {

    DataRepository<TranslatableEntity<?>> repo = repoService
        .getRepository(TranslationHelper.getTranslatableType(parent));

    if (repo instanceof TranslationRepository<?>) {
      TranslationRepository<?> translationRepo = (TranslationRepository<?>) repo;
      Method findByParent = translationRepo.getClass().getMethod("findByParent",
          parent.getClass().getSuperclass());

      assembler.setCurrentController(controller);
      return assembler.entitiesToResources(
          (List<TranslatableEntity<?>>) findByParent.invoke(translationRepo, parent), null);
    }
    throw new RuntimeException(
        "Repository of Translation must inherit from " + TranslationRepository.class);
  }

  /**
   * Translate.
   *
   * @param params the params
   * @param labels the labels
   */
  public void translate(TranslationQueryParam params, Map<String, String> labels) {
  }
}
