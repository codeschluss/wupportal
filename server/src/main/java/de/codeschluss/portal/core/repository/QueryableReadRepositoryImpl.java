package de.codeschluss.portal.core.repository;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPQLQuery;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.jpa.repository.support.QuerydslJpaPredicateExecutor;
import org.springframework.data.querydsl.EntityPathResolver;
import org.springframework.data.querydsl.SimpleEntityPathResolver;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.transaction.annotation.Transactional;

/**
 * The Class QueryableReadRepositoryImpl.
 * 
 * @author Valmir Etemi
 *
 */
@Transactional
public class QueryableReadRepositoryImpl<T> extends QuerydslJpaPredicateExecutor<T>
    implements QueryableReadRepository<T> {

  private static final EntityPathResolver resolver = SimpleEntityPathResolver.INSTANCE;

  private final EntityPath<T> path;
  private final PathBuilder<T> builder;
  private final Querydsl querydsl;

  /**
   * Instantiates a new data repository impl.
   *
   * @param entityInformation
   *          the entity information
   * @param entityManager
   *          the entity manager
   */
  public QueryableReadRepositoryImpl(JpaEntityInformation<T, ?> entityInformation,
      EntityManager entityManager) {
    super(entityInformation, entityManager, resolver, null);
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
    return executeSorted(createQuery(predicate).select(path), sort);
  }

  @Override
  public List<T> findAll(Predicate predicate) {
    return createQuery(predicate).select(path).distinct().fetch();
  }

  public List<T> findAll(Sort sort) {
    return executeSorted(createQuery().select(path), sort);
  }
  
  @Override
  public Page<T> findAll(Predicate predicate, Pageable pageable) {
    final JPQLQuery<?> countQuery = createCountQuery(predicate).distinct();
    JPQLQuery<T> query = querydsl.applyPagination(
        pageable, createQuery(predicate).select(path).distinct());

    return PageableExecutionUtils.getPage(
        query.distinct().fetch(), 
        pageable, 
        countQuery::fetchCount);
  }

  @Override
  public Page<T> findAll(Pageable pageable) {
    final JPQLQuery<?> countQuery = createCountQuery().distinct();
    JPQLQuery<T> query = querydsl.applyPagination(pageable, createQuery().select(path).distinct());

    return PageableExecutionUtils.getPage(
        query.distinct().fetch(), 
        pageable,
        countQuery::fetchCount);
  }

  private List<T> executeSorted(JPQLQuery<T> query, Sort sort) {
    return querydsl.applySorting(sort, query).distinct().fetch();
  }
}
