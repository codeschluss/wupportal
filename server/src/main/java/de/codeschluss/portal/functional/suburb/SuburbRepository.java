package de.codeschluss.portal.functional.suburb;

import de.codeschluss.portal.core.common.FilteredJpaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SuburbRepository extends FilteredJpaRepository<SuburbEntity, String> {

  @Query("Select s from SuburbEntity s where s.name like %?1%")
  Optional<List<SuburbEntity>> findFiltered(String filter, Sort sort);

  @Query("Select s from SuburbEntity s where s.name like %?1%")
  Optional<Page<SuburbEntity>> findFiltered(String filter, Pageable pageable);

  Optional<SuburbEntity> findByAddressesId(String addressId);

  Optional<SuburbEntity> findByName(String name);
}
