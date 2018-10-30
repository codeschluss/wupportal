package de.codeschluss.wupportal.organisation;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

import de.codeschluss.wupportal.base.FilteredJpaRepository;
import de.codeschluss.wupportal.provider.ProviderEntity;

public interface OrganisationRepository extends FilteredJpaRepository<OrganisationEntity, String> {

	@Query("Select o from OrganisationEntity o where o.mail like %?1% or o.name like %?1% or o.phone like %?1% or o.website like %?1% or o.address.houseNumber like %?1% or o.address.place like %?1% or o.address.place like %?1%")
	Optional<List<OrganisationEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select o from OrganisationEntity o where o.mail like %?1% or o.name like %?1% or o.phone like %?1% or o.website like %?1% or o.address.houseNumber like %?1% or o.address.place like %?1% or o.address.suburb like %?1%")
	Optional<Page<OrganisationEntity>> findFiltered(String filter, Pageable pageable);
	
	Optional<Page<OrganisationEntity>> findByProvidersIn(List<ProviderEntity> providers, Pageable page);
	
	Optional<List<OrganisationEntity>> findByProvidersIn(List<ProviderEntity> providers, Sort sort);
	
	Optional<List<OrganisationEntity>> findByProvidersIn(List<ProviderEntity> providers);
	
	boolean existsByName(String name);
	

}
