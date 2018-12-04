package de.codeschluss.portal.components.category.translations;

import de.codeschluss.portal.core.common.DataRepository;
import de.codeschluss.portal.core.translations.TranslationRepository;

import org.springframework.stereotype.Repository;

/**
 * The Interface OrganisationTranslatableRepository.
 * 
 * @author Valmir Etemi
 *
 */
@Repository
public interface CategoryTranslatableRepository 
    extends DataRepository<CategoryTranslatablesEntity>, 
    TranslationRepository<CategoryTranslatablesEntity> {
}
