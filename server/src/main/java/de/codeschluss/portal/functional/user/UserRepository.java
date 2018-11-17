package de.codeschluss.portal.functional.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import de.codeschluss.portal.core.common.FilteredJpaRepository;

@Repository
public interface UserRepository extends FilteredJpaRepository<UserEntity, String>{
	
	@Query("Select u from UserEntity u where u.username like %?1% or u.fullname like %?1% or u.phone like %?1%")
	Optional<List<UserEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select u from UserEntity u where u.username like %?1% or u.fullname like %?1% or u.phone like %?1%")
	Optional<Page<UserEntity>> findFiltered(String filter, Pageable pageable);

	boolean existsByUsername(String username);
	
	Optional<UserEntity> findByUsername(String userName);
}

