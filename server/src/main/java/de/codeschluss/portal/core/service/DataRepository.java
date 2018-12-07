package de.codeschluss.portal.core.service;

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
  public <S extends T> S save(S entity);
  
  @Override
  public Optional<T> findOne(Predicate predicate);
  
  @Override
  public List<T> findAll();
  
  @Override
  public List<T> findAll(Sort sort);
  
  @Override
  public List<T> findAll(Predicate predicate, Sort sort);
  
  @Override
  public Page<T> findAll(Predicate predicate, Pageable pageable);
  
  @Override
  public List<T> findAll(Predicate predicate);
  
}
