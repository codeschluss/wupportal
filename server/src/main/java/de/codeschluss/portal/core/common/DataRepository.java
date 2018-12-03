package de.codeschluss.portal.core.common;

import com.querydsl.core.types.Predicate;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * The Interface DataRepository.
 * 
 * @author Valmir Etemi
 *
 */
@NoRepositoryBean
public interface DataRepository<T>
    extends JpaRepository<T, String>, QuerydslPredicateExecutor<T> {
  
  @Override
  <S extends T> S save(S entity);
  
  @Override
  Optional<T> findOne(Predicate predicate);
  
  @Override
  List<T> findAll();
  
  @Override
  List<T> findAll(Predicate predicate, Sort sort);
  
  @Override
  Page<T> findAll(Predicate predicate, Pageable pageable);
  
  @Override
  List<T> findAll(Predicate predicate);
  
}
