package de.codeschluss.portal.core.translations;

import com.google.common.net.HttpHeaders;

import de.codeschluss.portal.core.appconfig.TranslationsConfig;
import de.codeschluss.portal.core.common.BaseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

// TODO: Auto-generated Javadoc
/**
 * The Class TranslationService.
 * 
 * @author Valmir Etemi
 *
 * @param <E> the element type
 */
public abstract class TranslationService<E extends BaseEntity> {
  
  /** The request. */
  @Autowired
  protected HttpServletRequest request;
  
  /** The config. */
  @Autowired
  protected TranslationsConfig config;
  
  /**
   * Localize on load.
   *
   * @param entity the entity
   * @return true, if successful
   */
  public abstract boolean localizeOnLoad(E entity);
  
  /**
   * Localize on save.
   *
   * @param entity the entity
   * @return true, if successful
   */
  public abstract boolean localizeOnSave(E entity);
  
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
    return languageHeaders.stream()
      .sorted()
      .map(header -> header.getLanguage())
      .distinct()
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
