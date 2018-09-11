package de.codeschluss.wupportal.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<UserEntity, String>{
	
	UserEntity findByUsername(String userName);

	@Query("Select u from UserEntity u where u.username like %?1% or u.fullname like %?1% or u.phone like %?1%")
	Optional<List<UserEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select u from UserEntity u where u.username like %?1% or u.fullname like %?1% or u.phone like %?1%")
	Optional<Page<UserEntity>> findFiltered(String filter, Pageable pageable);
}

