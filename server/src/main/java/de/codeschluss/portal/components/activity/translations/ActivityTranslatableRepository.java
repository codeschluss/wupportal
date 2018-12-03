package de.codeschluss.portal.components.activity.translations;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.core.common.DataRepository;
import de.codeschluss.portal.core.translations.TranslationRepository;
import de.codeschluss.portal.core.translations.language.LanguageEntity;

import org.springframework.stereotype.Repository;

/**
 * The Interface ActivityTranslatableRepository.
 * 
 * @author Valmir Etemi
 *
 */
@Repository
public interface ActivityTranslatableRepository 
    extends DataRepository<ActivityTranslatablesEntity>, 
    TranslationRepository<ActivityTranslatablesEntity> {
  
  ActivityEntity findByLanguageAndParent(LanguageEntity language, ActivityEntity parent);

}
