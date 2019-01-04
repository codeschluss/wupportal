package de.codeschluss.portal.core.i18n.language;

import com.google.common.net.HttpHeaders;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.i18n.TranslationsConfiguration;
import de.codeschluss.portal.core.service.ResourceDataService;

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
public class LanguageService extends ResourceDataService<LanguageEntity, LanguageQueryBuilder> {

  /** The default sort prop. */
  protected final String defaultSortProp = "name";
  
  /** The request. */
  protected HttpServletRequest request;

  /** The config. */
  protected TranslationsConfiguration config;
  
  /**
   * Instantiates a new language service.
   *
   * @param repo the repo
   * @param entities the entities
   */
  public LanguageService(
      LanguageRepository repo, 
      LanguageQueryBuilder entities,
      PagingAndSortingAssembler assembler,
      HttpServletRequest request,
      TranslationsConfiguration config) {
    super(repo, entities, assembler);
    this.request = request;
    this.config = config;
  }

  @Override
  public LanguageEntity getExisting(LanguageEntity newLanguage) {
    return repo.findOne(
        entities.withLocaleOrLanguage(newLanguage.getLocale(),newLanguage.getName())).orElse(null);
  }
  
  @Override
  public boolean validCreateFieldConstraints(LanguageEntity newLanguage) {
    return validFields(newLanguage);
  }
  
  @Override
  public boolean validUpdateFieldConstraints(LanguageEntity newLanguage) {
    return validFields(newLanguage);
  }
  
  private boolean validFields(LanguageEntity newLanguage) {
    return newLanguage.getLocale() != null && !newLanguage.getLocale().isEmpty()
        && newLanguage.getName() != null && !newLanguage.getName().isEmpty();
  }

  public boolean existsByLocales(List<String> locales) {
    return repo.exists(entities.withLocaleIn(locales));
  }

  public boolean existsByLocale(String locale) {
    return repo.exists(entities.withLocale(locale));
  }
  
  public LanguageEntity getByLocale(String locale) {
    return repo.findOne(entities.withLocale(locale))
        .orElseThrow(() -> new NotFoundException(locale));
  }

  @Override
  public LanguageEntity update(String id, LanguageEntity newLanguage) {
    return repo.findById(id).map(language -> {
      language.setName(newLanguage.getName());
      language.setLocale(newLanguage.getLocale());
      language.setMachineTranslated(newLanguage.getMachineTranslated());
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
    LanguageEntity lang = findForLocale(getWriteLocale());
    if (lang == null) {
      throw new BadParamsException(HttpHeaders.CONTENT_LANGUAGE + " Header with " + lang);
    }
    return lang;
  }
  
  public LanguageEntity findForLocale(String locale) {
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
