package de.codeschluss.portal.components.tag.translations;

import de.codeschluss.portal.core.i18n.translation.TranslationRepository;

import org.springframework.stereotype.Repository;

/**
 * The Interface TagTranslatableRepository.
 * 
 * @author Valmir Etemi
 *
 */
@Repository
public interface TagTranslatableRepository 
    extends TranslationRepository<TagTranslatablesEntity> {
}
