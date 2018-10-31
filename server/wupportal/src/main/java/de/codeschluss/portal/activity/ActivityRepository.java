package de.codeschluss.portal.activity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

import de.codeschluss.portal.base.FilteredJpaRepository;
import de.codeschluss.portal.provider.ProviderEntity;

public interface ActivityRepository extends FilteredJpaRepository<ActivityEntity, String> {
	
	public Optional<List<ActivityEntity>> findByProviderIdIn(List<String> providerId, Sort sort);
	
	public boolean existsByIdAndProviderIn(String id, List<ProviderEntity> provider);
	
	public Optional<List<ActivityEntity>> findByProviderIn(List<ProviderEntity> provider, Sort sort);
	
	public Optional<Page<ActivityEntity>> findByProviderIdIn(List<String> providerId, Pageable page);
	
	public Optional<Page<ActivityEntity>> findByProviderIn(List<ProviderEntity> provider, Pageable page);
	
	@Query("Select a from ActivityEntity a where a.name like %?1%")
	Optional<List<ActivityEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select a from ActivityEntity a where a.name like %?1%")
	Optional<Page<ActivityEntity>> findFiltered(String filter, Pageable pageable);

}
