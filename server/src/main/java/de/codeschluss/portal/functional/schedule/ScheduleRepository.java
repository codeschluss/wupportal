package de.codeschluss.portal.functional.schedule;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import de.codeschluss.portal.core.common.FilteredJpaRepository;

@Repository
public interface ScheduleRepository extends FilteredJpaRepository<ScheduleEntity, String> {
	
	@Query("Select s from ScheduleEntity s where s.activity.name like %?1% or s.startDate = ?1 or s.endDate = ?1")
	Optional<List<ScheduleEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select s from ScheduleEntity s where s.activity.name like %?1% or s.startDate = ?1 or s.endDate = ?1")
	Optional<Page<ScheduleEntity>> findFiltered(String filter, Pageable pageable);

	Optional<List<ScheduleEntity>> findByActivityId(String activityId);

	@Query("Select s from ScheduleEntity s where s.activity.id = ?1 and s.startDate >= current_date")
	Optional<List<ScheduleEntity>> findByActivityIdAndFutureOnly(String activityId);
}
