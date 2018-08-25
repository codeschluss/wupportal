package de.codeschluss.wupportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import de.codeschluss.wupportal.model.Provider;

public interface IProviderRepository extends JpaRepository<Provider, String> {
	
	Optional<List<Provider>> findPagedByOrganisationId(@Param("organisationId") String organisationId, Pageable page);

}
