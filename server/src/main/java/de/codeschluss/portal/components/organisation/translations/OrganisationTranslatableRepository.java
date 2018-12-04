package de.codeschluss.portal.components.organisation.translations;

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
public interface OrganisationTranslatableRepository 
    extends DataRepository<OrganisationTranslatablesEntity>, 
    TranslationRepository<OrganisationTranslatablesEntity> {
}
