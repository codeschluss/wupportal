package de.codeschluss.portal.core.translations;

import com.google.common.net.HttpHeaders;

import de.codeschluss.portal.core.appconfig.TranslationsConfig;
import de.codeschluss.portal.core.common.BaseEntity;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * Base Class for all translation services.
 * 
 * @author Valmir Etemi
 *
 */
public abstract class TranslationService<E extends BaseEntity> {
  
  @Autowired
  protected HttpServletRequest request;
  
  @Autowired
  protected TranslationsConfig config;
  
  public abstract boolean localizeOnLoad(E entity);
  
  public abstract boolean localizeOnSave(E entity);
  
  public String getReadLocale() {
    return request.getHeader(HttpHeaders.ACCEPT_LANGUAGE);
  }
  
  public String getWriteLocale() {
    return request.getHeader(HttpHeaders.CONTENT_LANGUAGE);
  }
  
  public String getDefaultLocale() {
    return config.getDefaultLocale();
  }
}
