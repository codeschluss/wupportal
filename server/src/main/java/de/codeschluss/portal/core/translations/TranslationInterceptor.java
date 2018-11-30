package de.codeschluss.portal.core.translations;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.activity.translations.ActivityTranslationService;

import java.io.Serializable;

import org.hibernate.EmptyInterceptor;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

/**
 * Intercepts database calls to localize entities.
 * 
 * @author Valmir Etemi
 *
 */
@Component
public class TranslationInterceptor extends EmptyInterceptor {

  @Autowired
  @Lazy
  private ActivityTranslationService activityTranslationService;

  private static final long serialVersionUID = 1L;

  @Override
  public boolean onLoad(
      Object entity, 
      Serializable id, 
      Object[] state, 
      String[] propertyNames,
      Type[] types) {
    if (entity instanceof ActivityEntity) {
      return activityTranslationService.localizeOnLoad((ActivityEntity) entity);
    }
    return false;
  }

}
