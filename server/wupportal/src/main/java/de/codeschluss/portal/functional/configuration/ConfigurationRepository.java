package de.codeschluss.portal.functional.configuration;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import de.codeschluss.portal.common.base.FilteredJpaRepository;

@Repository
public interface ConfigurationRepository extends FilteredJpaRepository<ConfigurationEntity, String>{

	@Query("Select c from ConfigurationEntity c where c.item like %?1%")
	Optional<List<ConfigurationEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select c from ConfigurationEntity c where c.item like %?1%")
	Optional<Page<ConfigurationEntity>> findFiltered(String filter, Pageable pageable);
}
