package de.codeschluss.portal.core.i18n.translation;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.entity.BaseEntity;
import de.codeschluss.portal.core.i18n.TranslationsConfiguration;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;
import de.codeschluss.portal.core.i18n.entities.TranslationResult;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;
import de.codeschluss.portal.core.i18n.language.LanguageService;
import de.codeschluss.portal.core.repository.DataRepository;
import de.codeschluss.portal.core.repository.RepositoryService;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.aspectj.lang.annotation.Around;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resources;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

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
  private final PagingAndSortingAssembler assembler;

  private final TranslationsConfiguration config;

  /** The translation client. */
  private WebClient translationClient;

  /**
   * Instantiates a new translation service.
   *
   * @param repoService
   *          the repo service
   * @param languageService
   *          the language service
   * @param assembler
   *          the assembler
   */
  @Autowired
  public TranslationService(RepositoryService repoService, LanguageService languageService,
      PagingAndSortingAssembler assembler, TranslationsConfiguration config) {
    this.repoService = repoService;
    this.languageService = languageService;
    this.assembler = assembler;
    this.config = config;
    this.translationClient = WebClient.create();
  }

  /**
   * Localize list.
   *
   * @param list
   *          the list
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
   * @param entity
   *          the entity
   * @param locales
   *          the locales
   * @throws Throwable
   *           the throwable
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
   * @param <E>
   *          the element type
   * @param savedEntity
   *          the saved entity
   * @throws Throwable
   *           the throwable
   */
  @SuppressWarnings("unchecked")
  @Around("save()")
  public <E extends BaseEntity> void save(Object savedEntity) throws Throwable {
    TranslatableEntity<?> translatableObject = createTranslatableObject((E) savedEntity,
        languageService.getCurrentWriteLanguage());
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
  private TranslatableEntity<?> createTranslatableObject(BaseEntity savedEntity,
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
   * @throws JsonParseException the json parse exception
   * @throws JsonMappingException the json mapping exception
   * @throws IllegalAccessException the illegal access exception
   * @throws IllegalArgumentException the illegal argument exception
   * @throws InvocationTargetException the invocation target exception
   * @throws IOException Signals that an I/O exception has occurred.
   */
  @SuppressWarnings("unchecked")
  public Resources<?> getAllTranslations(BaseEntity parent, CrudController<?, ?> controller)
      throws NoSuchMethodException, SecurityException, JsonParseException, JsonMappingException,
      IllegalAccessException, IllegalArgumentException, InvocationTargetException, IOException {

    DataRepository<TranslatableEntity<?>> repo = repoService
        .getRepository(TranslationHelper.getTranslatableType(parent));

    if (repo instanceof TranslationRepository<?>) {
      TranslationRepository<?> translationRepo = (TranslationRepository<?>) repo;
      Method findByParent = translationRepo.getClass().getMethod("findByParent",
          parent.getClass().getSuperclass());

      return assembler.entitiesToResources(
          (List<TranslatableEntity<?>>) findByParent.invoke(translationRepo, parent), null);
    }
    throw new RuntimeException(
        "Repository of Translation must inherit from " + TranslationRepository.class);
  }

  /**
   * Translate.
   *
   * @param params
   *          the params
   * @param labels
   *          the labels
   */
  public List<TranslationResult> translateAll(TranslationQueryParam params,
      Map<String, String> labels) {

    List<TranslationResult> results = new ArrayList<>();
    params.getTargets().stream().forEach(targetLang -> {
      TranslationResult translationResult = new TranslationResult();
      Map<String, String> translatedLabels = new HashMap<>(labels.size());
      String machineTranslatedLabel = getMachineTranslatedLabel(targetLang);

      labels.forEach((label, text) -> {
        String translation = translate(targetLang, params.getSource(), text);
        translatedLabels.put(label, addMachineTranslatedTo(translation, machineTranslatedLabel));
      });

      translationResult.setLang(targetLang);
      translationResult.setTranslations(translatedLabels);
      results.add(translationResult);
    });
    return results;
  }

  /**
   * Gets the machine translated label.
   *
   * @param targetLang
   *          the target lang
   * @return the machine translated label
   */
  private String getMachineTranslatedLabel(String targetLang) {
    String machineTranslated = languageService.getByLocale(targetLang).getMachineTranslated();

    if (machineTranslated == null || machineTranslated.isEmpty()) {
      machineTranslated = translate(targetLang, config.getDefaultLocale(),
          config.getDefaultAutomaticTranslated());
    }

    return machineTranslated;
  }

  /**
   * Translate.
   *
   * @param target
   *          the target
   * @param source
   *          the source
   * @param text
   *          the text
   * @return the string
   */
  public String translate(String target, String source, String text) {
    String response = translationClient.method(HttpMethod.GET).uri(createUri(target, source, text))
        .header("Ocp-Apim-Subscription-Key", config.getServiceSubscriptionKey()).retrieve()
        .bodyToMono(String.class).block();
    return prepareReponse(response, target);
  }

  /**
   * Creates the uri.
   *
   * @param target
   *          the target
   * @param source
   *          the source
   * @param text
   *          the text
   * @return the uri
   */
  private URI createUri(String target, String source, String text) {
    return UriComponentsBuilder.fromUriString(config.getServiceUrl()).queryParam("to", target)
        .queryParam("from", source).queryParam("text", text).build().encode().toUri();
  }

  /**
   * Prepare reponse.
   *
   * @param response
   *          the response
   * @return the string
   */
  private String prepareReponse(String response, String targetLang) {
    // TODO: Workaround. Not able to properly extract result.
    return response
        .replace("<string xmlns=\"http://schemas.microsoft.com/2003/10/Serialization/\">", "")
        .replace("</string>", "");
  }

  /**
   * Adds the machine translated to.
   *
   * @param translation
   *          the translation
   * @param machineTranslated
   *          the machine translated
   * @return the string
   */
  private String addMachineTranslatedTo(String translation, String machineTranslated) {
    return "(" + machineTranslated + ") " + translation;
  }
}
