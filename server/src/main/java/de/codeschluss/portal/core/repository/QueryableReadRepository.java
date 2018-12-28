package de.codeschluss.portal.core.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

/**
 * The Interface QueryableReadRepository.
 * 
 * @author Valmir Etemi
 *
 */
@NoRepositoryBean
public interface QueryableReadRepository<T> extends Repository<T, String> {
  
  List<T> findAll(Predicate predicate);
  
  List<T> findAll(Sort sort);

  List<T> findAll(Predicate predicate, Sort sort);
  
  List<T> findAll(OrderSpecifier<?>... orders);
  
  List<T> findAll(Predicate predicate, OrderSpecifier<?>... orders);
  
  Page<T> findAll(Pageable page);
  
  Page<T> findAll(Predicate predicate, Pageable page);
  
  Optional<T> findOne(Predicate predicate);
  
  boolean exists(Predicate predicate);
}
