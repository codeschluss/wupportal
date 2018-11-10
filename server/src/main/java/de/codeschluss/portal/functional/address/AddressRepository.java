package de.codeschluss.portal.functional.address;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import de.codeschluss.portal.common.base.FilteredJpaRepository;

@Repository
public interface AddressRepository extends FilteredJpaRepository<AddressEntity, String> {
	
	@Query("Select a from AddressEntity a where a.houseNumber like %?1% or a.place like %?1% or a.postalCode like %?1% or a.street like %?1% or a.suburb.name like %?1% or a.longitude like %?1% or a.latitude like %?1%")
	Optional<List<AddressEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select a from AddressEntity a where a.houseNumber like %?1% or a.place like %?1% or a.postalCode like %?1% or a.street like %?1% or a.suburb.name like %?1% or a.longitude like %?1% or a.latitude like %?1%")
	Optional<Page<AddressEntity>> findFiltered(String filter, Pageable pageable);

	Optional<AddressEntity> findByOrganisationsId(String orgaId);
	
	Optional<AddressEntity> findByActivitiesId(String activityId);

	Optional<AddressEntity> findByHouseNumberAndPlaceAndPostalCodeAndStreet(String houseNumber, String place, String postalCode, String street);


}
