package de.codeschluss.portal.functional.category;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import de.codeschluss.portal.common.base.FilteredJpaRepository;

@Repository
public interface CategoryRepository extends FilteredJpaRepository<CategoryEntity, String>{

	@Query("Select c from CategoryEntity c where c.name like %?1% or c.description like %?1%")
	Optional<List<CategoryEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select c from CategoryEntity c where c.name like %?1% or c.description like %?1%")
	Optional<Page<CategoryEntity>> findFiltered(String filter, Pageable pageable);

	Optional<CategoryEntity> findByName(String name);
	
}
