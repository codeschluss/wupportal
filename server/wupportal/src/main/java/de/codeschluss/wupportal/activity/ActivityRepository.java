package de.codeschluss.wupportal.activity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;

import de.codeschluss.wupportal.base.FilteredJpaRepository;

public interface ActivityRepository extends FilteredJpaRepository<ActivityEntity, String> {
	
	public Optional<List<ActivityEntity>> findByProviderIdIn(@Param("providerId") List<String> providerId);
}
