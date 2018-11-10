package de.codeschluss.portal.functional.activity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import de.codeschluss.portal.common.base.FilteredJpaRepository;
import de.codeschluss.portal.functional.provider.ProviderEntity;

@Repository
public interface ActivityRepository extends FilteredJpaRepository<ActivityEntity, String> {
	
	@Query("Select a from ActivityEntity a where a.name like %?1%")
	Optional<List<ActivityEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select a from ActivityEntity a where a.name like %?1%")
	Optional<Page<ActivityEntity>> findFiltered(String filter, Pageable pageable);
	
	Optional<ActivityEntity> findByName(String name);
	
	public Optional<List<ActivityEntity>> findByProviderIdIn(List<String> providerId, Sort sort);
	
	public boolean existsByIdAndProviderIn(String id, List<ProviderEntity> provider);
	
	public Optional<List<ActivityEntity>> findByProviderIn(List<ProviderEntity> provider);
	
	public Optional<Page<ActivityEntity>> findByProviderIdIn(List<String> providerId, Pageable page);
	
	public Optional<Page<ActivityEntity>> findByProviderIn(List<ProviderEntity> provider, Pageable page);



}
