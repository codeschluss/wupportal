package de.codeschluss.portal.functional.translation;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import de.codeschluss.portal.core.common.FilteredJpaRepository;

@Repository
public interface TranslationRepository extends FilteredJpaRepository<TranslationEntity, String> {

	@Query("Select t from TranslationEntity t where t.name like %?1% or t.locale like %?1%")
	Optional<List<TranslationEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select t from TranslationEntity t where t.name like %?1% or t.locale like %?1%")
	Optional<Page<TranslationEntity>> findFiltered(String filter, Pageable pageable);
}
