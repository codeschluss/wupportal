package de.codeschluss.portal.core.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * The Interface QueryableReadRepository.
 * 
 * @author vetemi
 *
 */
@NoRepositoryBean
public interface QueryableReadRepository<T> extends QuerydslPredicateExecutor<T> {
  
  List<T> findAll(Predicate predicate);
  
  List<T> findAll(Sort sort);
  
  Page<T> findAll(Pageable page);

  List<T> findAll(Predicate predicate, Sort sort);

  List<T> findAll(Predicate predicate, OrderSpecifier<?>... orders);

  List<T> findAll(OrderSpecifier<?>... orders);
}
