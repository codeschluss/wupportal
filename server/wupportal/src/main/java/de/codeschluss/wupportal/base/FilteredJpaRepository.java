package de.codeschluss.wupportal.base;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilteredJpaRepository<T, ID> extends JpaRepository<T, ID> {

	Optional<List<T>> findFiltered(String filter, Sort sort);
	
	Optional<Page<T>> findFiltered(String filter, Pageable pageable);
}
