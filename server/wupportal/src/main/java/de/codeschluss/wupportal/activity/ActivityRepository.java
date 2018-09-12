package de.codeschluss.wupportal.activity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

import de.codeschluss.wupportal.base.FilteredJpaRepository;

public interface ActivityRepository extends FilteredJpaRepository<ActivityEntity, String> {
	
	public Optional<List<ActivityEntity>> findByProviderIdIn(List<String> providerId, Sort sort);
	
	public Optional<Page<ActivityEntity>> findByProviderIdIn(List<String> providerId, Pageable page);
	
	@Query("Select a from ActivityEntity a where a.name like %?1%")
	Optional<List<ActivityEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select a from ActivityEntity a where a.name like %?1%")
	Optional<Page<ActivityEntity>> findFiltered(String filter, Pageable pageable);

}
