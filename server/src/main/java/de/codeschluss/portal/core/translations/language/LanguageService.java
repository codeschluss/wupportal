package de.codeschluss.portal.core.translations.language;

import com.google.common.net.HttpHeaders;

import de.codeschluss.portal.core.appconfig.TranslationsConfig;
import de.codeschluss.portal.core.common.DataService;
import de.codeschluss.portal.core.exception.BadParamsException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

/**
 * The Class LanguageService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class LanguageService extends DataService<LanguageEntity, LanguageQueryBuilder> {

  /** The request. */
  protected HttpServletRequest request;

  /** The config. */
  protected TranslationsConfig config;
  
  /**
   * Instantiates a new language service.
   *
   * @param repo the repo
   * @param entities the entities
   */
  public LanguageService(
      LanguageRepository repo, 
      LanguageQueryBuilder entities,
      HttpServletRequest request,
      TranslationsConfig config) {
    super(repo, entities);
    this.request = request;
    this.config = config;
  }

  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common
   * .DataService#getExisting(de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public LanguageEntity getExisting(LanguageEntity newLanguage) {
    return getForLocale(newLanguage.getLocale());
  }

  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.common
   * .DataService#update(java.lang.String, de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public LanguageEntity update(String id, LanguageEntity newLanguage) {
    return repo.findById(id).map(language -> {
      language.setName(newLanguage.getName());
      language.setLocale(newLanguage.getLocale());
      return repo.save(language);
    }).orElseGet(() -> {
      newLanguage.setId(id);
      return repo.save(newLanguage);
    });
  }
  
  /**
   * Gets the current language.
   *
   * @return the current language
   */
  public LanguageEntity getCurrentWriteLanguage() {
    LanguageEntity lang = getForLocale(getWriteLocale());
    if (lang == null) {
      throw new BadParamsException(HttpHeaders.CONTENT_LANGUAGE + " Header with " + lang);
    }
    return lang;
  }
  
  public LanguageEntity getForLocale(String locale) {
    return repo.findOne(entities.withLocale(locale)).orElse(null);
  }
  
  /**
   * Gets the sorted read localed based on q-factor.
   *
   * @return the sorted read locales
   */
  public List<String> getCurrentReadLocales() {
    String header = request.getHeader(HttpHeaders.ACCEPT_LANGUAGE);
    if (header == null || header.isEmpty()) {
      List<String> defaultHeader = new ArrayList<String>();
      defaultHeader.add(getDefaultLocale());
      return defaultHeader;
    }
    
    String[] extractedLanguages = header.trim().split(",");
    List<LanguageHeader> languageHeaders = new ArrayList<LanguageHeader>();
    for (String unprepared : extractedLanguages) {
      languageHeaders.add(new LanguageHeader(unprepared));
    }
    return languageHeaders.stream().sorted().map(langHeader -> langHeader.getLanguage()).distinct()
        .collect(Collectors.toList());
  }

  /**
   * Gets the write locale.
   *
   * @return the write locale
   */
  public String getWriteLocale() {
    String header = request.getHeader(HttpHeaders.CONTENT_LANGUAGE);
    if (header == null || header.isEmpty()) {
      return getDefaultLocale();
    }
    return header.substring(0, 2);
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
