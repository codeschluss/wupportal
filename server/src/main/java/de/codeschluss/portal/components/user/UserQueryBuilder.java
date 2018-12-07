package de.codeschluss.portal.components.user;

import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.service.QueryBuilder;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class UserQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class UserQueryBuilder extends QueryBuilder<QUserEntity> {
  
  /**
   * Instantiates a new user query builder.
   */
  public UserQueryBuilder() {
    super(QUserEntity.userEntity);
  }

  /**
   * With username.
   *
   * @param username the username
   * @return the boolean expression
   */
  public BooleanExpression withUsername(String username) {
    return query.username.eq(username);
  }

  /**
   * As superuser.
   *
   * @return the boolean expression
   */
  public BooleanExpression asSuperuser() {
    return query.superuser.eq(true);
  }

  /**
   * Fuzzy search.
   *
   * @param params the params
   * @return the boolean expression
   */
  @Override
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.fullname.likeIgnoreCase(filter)
        .or(query.username.likeIgnoreCase(filter))
        .or(query.phone.likeIgnoreCase(filter));
  }
  
  

}
