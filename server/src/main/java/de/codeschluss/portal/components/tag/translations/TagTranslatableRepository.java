package de.codeschluss.portal.components.tag.translations;

import de.codeschluss.portal.core.common.DataRepository;
import de.codeschluss.portal.core.translations.TranslationRepository;

import org.springframework.stereotype.Repository;

/**
 * The Interface TagTranslatableRepository.
 * 
 * @author Valmir Etemi
 *
 */
@Repository
public interface TagTranslatableRepository 
    extends DataRepository<TagTranslatablesEntity>, 
    TranslationRepository<TagTranslatablesEntity> {
}
