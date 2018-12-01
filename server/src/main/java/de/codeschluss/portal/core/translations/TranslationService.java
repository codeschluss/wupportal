package de.codeschluss.portal.core.translations;

import com.google.common.net.HttpHeaders;

import de.codeschluss.portal.core.appconfig.TranslationsConfig;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class TranslationService.
 * 
 * @author Valmir Etemi
 *
 * @param <E>
 *          the element type
 */
@Service
public class TranslationService {

  /** The request. */
  @Autowired
  protected HttpServletRequest request;

  /** The config. */
  @Autowired
  protected TranslationsConfig config;

  /**
   * Localize on load.
   *
   * @param entity
   *          the entity
   * @return true, if successful
   */
  public boolean localizeOnLoad(Object entity, List<?> translatables) {
    List<String> locales = getReadLocale();
    for (String locale : locales) {
      boolean isTouched = localize(entity, getTranslations(translatables, locale));
      if (isTouched) {
        return isTouched;
      }
    }
    return localize(entity, getTranslations(translatables, getDefaultLocale()));
  }

  /**
   * Gets the translations.
   *
   * @param translatables the translatables
   * @param locale the locale
   * @return the translations
   */
  private Map<String, String> getTranslations(List<?> translatables, String locale) {
    try {
      for (Object translatable : translatables) {
        Map<String, String> translations = new HashMap<>();
        boolean matched = false;
        for (Field field : translatable.getClass().getDeclaredFields()) {
          field.setAccessible(true);
          Object fieldValue = field.get(translatable);
          if (fieldValue instanceof String) {
            translations.put(field.getName(), fieldValue.toString());
          }
          
          if (fieldValue instanceof LanguageEntity) {
            LanguageEntity language = (LanguageEntity) fieldValue;
            matched = language.getLocale().equals(locale);
          }
        }
        if (matched) {
          return translations;
        }
      }
    } catch (IllegalArgumentException | IllegalAccessException e) {
      throw new RuntimeException("Something went wrong during translation mapping");
    }
    return null;
  }

  /**
   * Localize.
   *
   * @param <E> the element type
   * @param <S> the generic type
   * @param entity the entity
   * @param defaultLocale the default locale
   * @return true, if successful
   */
  private boolean localize(Object entity, Map<String,String> translations) {
    boolean touched = false;
    if (translations == null) {
      return touched;
    }
    
    try {
      for (Field field : entity.getClass().getDeclaredFields()) {
        field.setAccessible(true);
        String translation = translations.get(field.getName());
        if (translation != null) {
          field.set(entity, translation);
          touched = true;
        }
      }
    } catch (IllegalArgumentException | IllegalAccessException e) {
      e.printStackTrace();
    }
    return touched;
  }

  /**
   * Localize on save.
   *
   * @param entity
   *          the entity
   * @return true, if successful
   */
  public boolean localizeOnSave(Object entity) {
    return false;

  }

  /**
   * Gets the sorted read localed based on q-factor.
   *
   * @return the sorted read locales
   */
  public List<String> getReadLocale() {
    String[] extractedLanguages = request.getHeader(HttpHeaders.ACCEPT_LANGUAGE).trim().split(",");
    List<LanguageHeader> languageHeaders = new ArrayList<LanguageHeader>();
    for (String unprepared : extractedLanguages) {
      languageHeaders.add(new LanguageHeader(unprepared));
    }
    return languageHeaders.stream().sorted().map(header -> header.getLanguage()).distinct()
        .collect(Collectors.toList());
  }

  /**
   * Gets the write locale.
   *
   * @return the write locale
   */
  public String getWriteLocale() {
    return HttpHeaders.CONTENT_LANGUAGE.substring(0, 2);
  }

  /**
   * Gets the default locale.
   *
   * @return the default locale
   */
  public String getDefaultLocale() {
    return config.getDefaultLocale();
  }
}
