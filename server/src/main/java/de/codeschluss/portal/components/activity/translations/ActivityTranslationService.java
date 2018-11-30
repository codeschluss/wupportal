package de.codeschluss.portal.components.activity.translations;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.core.appconfig.TranslationsConfig;
import de.codeschluss.portal.core.translations.TranslationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * The Class ActivityTranslationService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
@Transactional
public class ActivityTranslationService extends TranslationService<ActivityEntity> {
  
  /** The query. */
  private QActivityTranslatablesEntity query = 
      QActivityTranslatablesEntity.activityTranslatablesEntity;
  
  /** The repo. */
  @Autowired
  private ActivityTranslatableRepository repo;
  
  /**
   * Localizes the activity.
   *
   * @param activity
   *          the activity
   * @return the localized activity
   */
  public boolean localizeOnLoad(ActivityEntity activity) {
    String locale = getReadLocale();
    
    ActivityTranslatablesEntity translation = getTranslatable(activity, getReadLocale());
    if (translation == null) {
      translation = getTranslatable(activity, getDefaultLocale());
    }
    
    activity.setName(translation.getName());
    activity.setDescription(translation.getDescription());
    return true;
  }

  private ActivityTranslatablesEntity getTranslatable(ActivityEntity activity, String locale) {
    return null;
  }

  /**
   * Gets the localization Predicate.
   *
   * @param activity
   *          the activity
   * @param locale
   *          the locale
   * @return the localization Predicate
   */
  private Predicate localizedActivity(ActivityEntity activity, String locale) {
    return query.activity.eq(activity).and(query.language.locale.eq(locale));
  }

  /* (non-Javadoc)
   * @see de.codeschluss.portal.core.translations
   * .TranslationService#localizeOnSave(de.codeschluss.portal.core.common.BaseEntity)
   */
  @Override
  public boolean localizeOnSave(ActivityEntity entity) {
    // TODO Auto-generated method stub
    return false;
  }
}
