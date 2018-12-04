package de.codeschluss.portal.core.translations;

import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.core.translations.language.LanguageEntity;

import org.springframework.data.repository.NoRepositoryBean;

/**
 * The Interface TranslationRepository.
 * 
 * @author Valmir Etemi
 *
 */
@NoRepositoryBean
public interface TranslationRepository<E extends BaseEntity> {
  
  <S extends BaseEntity> S findByLanguageAndParent(LanguageEntity language, E parent);
}
