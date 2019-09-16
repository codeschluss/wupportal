package de.codeschluss.portal.components.provider;

import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.service.QueryBuilder;

import java.util.List;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class ProviderQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class ProviderQueryBuilder extends QueryBuilder<QProviderEntity> {
  
  /**
   * Instantiates a new provider query builder.
   */
  public ProviderQueryBuilder() {
    super(QProviderEntity.providerEntity);
  }

  /**
   * With user id and any of orga ids.
   *
   * @param userId the user id
   * @param orgaIds the orga ids
   * @return the boolean expression
   */
  public BooleanExpression withUserIdAndAnyOfOrgaIds(String userId, List<String> orgaIds) {
    return withUserId(userId).and(query.organisation.id.in(orgaIds));
  }
  
  /**
   * With user id and orga id.
   *
   * @param userId the user id
   * @param orgaId the orga id
   * @return the boolean expression
   */
  public BooleanExpression withUserIdAndOrgaId(String userId, String orgaId) {
    return withUserId(userId).and(withOrgaId(orgaId));
  }
 
  /**
   * With approved orgas and user.
   *
   * @param userId the user id
   * @return the boolean expression
   */
  public BooleanExpression withApprovedOrgasAndUser(String userId) {
    return withUserId(userId)
        .and(withApprovedOrgas())
        .and(approved());
  }
  
  /**
   * With approved orgas.
   *
   * @return the boolean expression
   */
  private BooleanExpression withApprovedOrgas() {
    return query.organisation.approved.isTrue();
  }
  
  /**
   * As orga admins.
   *
   * @param userId the user id
   * @return the boolean expression
   */
  public BooleanExpression asOrgaAdmins(String userId) {
    return withUserId(userId).and(admin());
  }
  
  /**
   * Adminsfor orga.
   *
   * @param orgaId the orga id
   * @return the boolean expression
   */
  public BooleanExpression adminsforOrga(String orgaId) {
    return query.organisation.id.eq(orgaId).and(admin());
  }
  
  /**
   * Admin.
   *
   * @return the boolean expression
   */
  public BooleanExpression admin() {
    return query.admin.isTrue();
  }

  /**
   * Approved.
   *
   * @return the boolean expression
   */
  public BooleanExpression approved() {
    return query.approved.isTrue();
  }

  /**
   * With user id.
   *
   * @param userId the user id
   * @return the boolean expression
   */
  public BooleanExpression withUserId(String userId) {
    return query.user.id.eq(userId);
  }
  
  /**
   * With orga id.
   *
   * @param orgaId the orga id
   * @return the boolean expression
   */
  public BooleanExpression withOrgaId(String orgaId) {
    return query.organisation.id.eq(orgaId);
  }

  /**
   * With any activity id.
   *
   * @param activityId the activity id
   * @return the boolean expression
   */
  public BooleanExpression withAnyActivityId(String activityId) {
    return query.activities.any().id.eq(activityId);
  }

  @Override
  public BooleanExpression search(FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return query.activities.any().translatables.any().name.likeIgnoreCase(filter)
        .or(query.organisation.name.likeIgnoreCase(filter))
        .or(query.user.username.likeIgnoreCase(filter));
  }
}
