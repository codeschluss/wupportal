package de.codeschluss.portal.components.tag;

import de.codeschluss.portal.core.common.FilteredJpaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends FilteredJpaRepository<TagEntity, String> {

  @Query("Select t from TagEntity t where t.name like %?1% or t.description like %?1%")
  Optional<List<TagEntity>> findFiltered(String filter, Sort sort);

  @Query("Select t from TagEntity t where t.name like %?1% or t.description like %?1%")
  Optional<Page<TagEntity>> findFiltered(String filter, Pageable pageable);

  Optional<TagEntity> findByName(String name);

  Optional<List<TagEntity>> findByActivitiesId(String activityId);
}
