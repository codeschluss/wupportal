package de.codeschluss.wupportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import de.codeschluss.wupportal.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity, String> {
	
	public Optional<List<Activity>> findPagedByProviderIdIn(@Param("providerId") List<String> providerId, Pageable page);
}
