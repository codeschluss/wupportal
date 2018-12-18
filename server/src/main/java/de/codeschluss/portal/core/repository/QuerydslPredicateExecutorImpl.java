package de.codeschluss.portal.core.repository;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.PathBuilder;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.jpa.repository.support.QuerydslJpaPredicateExecutor;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.querydsl.EntityPathResolver;
import org.springframework.data.querydsl.SimpleEntityPathResolver;
import org.springframework.transaction.annotation.Transactional;

/**
 * The Class QuerydslPredicateExecutorImpl.
 * 
 * @author Valmir Etemi
 *
 */
@Transactional
public class QuerydslPredicateExecutorImpl<T> extends QuerydslJpaPredicateExecutor<T>
    implements QueryableReadRepository<T> {

  private static final EntityPathResolver resolver = SimpleEntityPathResolver.INSTANCE;
  
  private final SimpleJpaRepository<T, String> baseRepository;
  private final EntityPath<T> path;
  private final PathBuilder<T> builder;
  private final Querydsl querydsl;

  /**
   * Instantiates a new data repository impl.
   *
   * @param entityInformation the entity information
   * @param entityManager the entity manager
   */
  public QuerydslPredicateExecutorImpl(JpaEntityInformation<T, ?> entityInformation,
      EntityManager entityManager) {
    super(entityInformation, entityManager, resolver, null); 
    baseRepository = new SimpleJpaRepository<>(entityInformation, entityManager);
    this.path = resolver.createPath(entityInformation.getJavaType());
    this.builder = new PathBuilder<T>(path.getType(), path.getMetadata());
    this.querydsl = new Querydsl(entityManager, builder);
  }
  
  @Override
  public Optional<T> findOne(Predicate predicate) {
    return super.findOne(predicate); 
  }
  
  @Override
  public List<T> findAll(OrderSpecifier<?>... orders) {
    return super.findAll(orders);
  }
  
  @Override
  public List<T> findAll(Predicate predicate, Sort sort) {
    return super.findAll(predicate, sort);
  }
  
  @Override
  public Page<T> findAll(Predicate predicate, Pageable pageable) {
    return super.findAll(predicate, pageable);    
  }
  
  @Override
  public List<T> findAll(Predicate predicate) {
    return super.findAll(predicate);
  }
  
  public List<T> findAll(Sort sort) {
    return baseRepository.findAll(sort);
  }

  @Override
  public Page<T> findAll(Pageable pageable) {
    return baseRepository.findAll(pageable);
  }
}
