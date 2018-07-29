package de.codeschluss.wupportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import de.codeschluss.wupportal.model.Activity;

@RepositoryRestResource(collectionResourceRel = "activities", path = "activities")
public interface IActivityRepository extends JpaRepository<Activity, String> {
	
	Optional<List<Activity>> findByProviderIdIn(@Param("providerId") List<String> providerId);

}
