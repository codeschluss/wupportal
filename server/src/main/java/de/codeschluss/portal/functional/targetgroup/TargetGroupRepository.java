package de.codeschluss.portal.functional.targetgroup;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import de.codeschluss.portal.core.common.FilteredJpaRepository;

@Repository
public interface TargetGroupRepository extends FilteredJpaRepository<TargetGroupEntity, String>{

	@Query("Select t from TargetGroupEntity t where t.name like %?1% or t.description like %?1%")
	Optional<List<TargetGroupEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select t from TargetGroupEntity t where t.name like %?1% or t.description like %?1%")
	Optional<Page<TargetGroupEntity>> findFiltered(String filter, Pageable pageable);

	Optional<TargetGroupEntity> findByName(String name);

	Optional<List<TargetGroupEntity>> findByActivitiesId(String activityId);
}
