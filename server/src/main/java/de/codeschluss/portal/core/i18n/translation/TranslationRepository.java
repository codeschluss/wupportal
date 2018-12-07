package de.codeschluss.portal.core.i18n.translation;

import de.codeschluss.portal.core.i18n.entities.LocalizedEntity;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;
import de.codeschluss.portal.core.service.DataRepository;

import java.util.List;

import org.springframework.data.repository.NoRepositoryBean;

/**
 * The Interface TranslationRepository.
 * 
 * @author Valmir Etemi
 *
 */
@NoRepositoryBean
public interface TranslationRepository<T extends TranslatableEntity<?>> 
    extends DataRepository<T> {
 
  <L extends LocalizedEntity<?>> T findByLanguageAndParent(LanguageEntity language, L parent);
  
  <L extends LocalizedEntity<?>> List<T> findByParent(L parent);
}
