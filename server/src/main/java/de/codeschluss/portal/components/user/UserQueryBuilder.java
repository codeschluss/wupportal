package de.codeschluss.portal.components.user;

import com.querydsl.core.types.dsl.BooleanExpression;

import org.springframework.stereotype.Service;

@Service
public class UserQueryBuilder {
  
  private final QUserEntity query;
  
  public UserQueryBuilder() {
    query = QUserEntity.userEntity;
  }

  public BooleanExpression isUsername(String username) {
    return query.username.eq(username);
  }

  public BooleanExpression isSuperuser() {
    return query.superuser.eq(true);
  }

  public BooleanExpression fuzzySearchQuery(String filter) {
    return query.fullname.likeIgnoreCase(filter)
        .or(query.username.likeIgnoreCase(filter))
        .or(query.phone.likeIgnoreCase(filter));
  }
  
  

}
