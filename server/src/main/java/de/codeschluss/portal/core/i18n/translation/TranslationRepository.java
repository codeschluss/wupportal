package de.codeschluss.portal.core.i18n.translation;

import de.codeschluss.portal.core.entity.BaseEntity;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;
import de.codeschluss.portal.core.repository.DataRepository;

import java.util.List;

import org.springframework.data.repository.NoRepositoryBean;

/**
 * The Interface TranslationRepository.
 * 
 * @author Valmir Etemi
 *
 */
@NoRepositoryBean
public interface TranslationRepository<T extends TranslatableEntity<?>> extends DataRepository<T> {

  <E extends BaseEntity> T findByLanguageAndParent(LanguageEntity language, E parent);

  <E extends BaseEntity> List<T> findByParent(E parent);
}
