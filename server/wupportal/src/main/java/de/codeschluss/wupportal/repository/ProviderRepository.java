package de.codeschluss.wupportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import de.codeschluss.wupportal.model.Provider;
import de.codeschluss.wupportal.user.UserEntity;

public interface ProviderRepository extends JpaRepository<Provider, String> {
	
	Optional<List<Provider>> findByUser(UserEntity user);
	
	Optional<List<Provider>> findPagedByOrganisationId(String organisationId, Pageable page);

}
