package de.codeschluss.portal.components.targetgroup.translations;

import de.codeschluss.portal.core.common.DataRepository;
import de.codeschluss.portal.core.translations.TranslationRepository;

import org.springframework.stereotype.Repository;

/**
 * The Interface TargetGroupTranslatableRepository.
 * 
 * @author Valmir Etemi
 *
 */
@Repository
public interface TargetGroupTranslatableRepository 
    extends DataRepository<TargetGroupTranslatablesEntity>, 
    TranslationRepository<TargetGroupTranslatablesEntity> {
}
