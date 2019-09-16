package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.core.exception.BadParamsException;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@Rollback
public class UserControllerDeleteActivitiesForUserTest {

  @Autowired
  private UserController controller;

  @Test
  @WithUserDetails("super@user")
  public void deleteForOtherUserSuperUserOk() {
    String userId = "00000000-0000-0000-0004-300000000000";
    String activityId = "00000000-0000-0000-0010-400000000000";

    assertContaining(userId, activityId);

    controller.deleteActivity(userId, activityId);

    assertNotContaining(userId, activityId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void deleteProviderForOwnUserOk() {
    String userId = "00000000-0000-0000-0004-300000000000";
    String activityId = "00000000-0000-0000-0010-500000000000";

    assertContaining(userId, activityId);

    controller.deleteActivity(userId, activityId);

    assertNotContaining(userId, activityId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("provider1@user")
  public void deleteActivityForNotMatchingIdsDenied() {
    String userId = "00000000-0000-0000-0004-300000000000";
    String activityId = "00000000-0000-0000-0010-100000000000";

    controller.deleteActivity(userId, activityId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void deleteActivityForOtherUserDenied() {
    String userId = "00000000-0000-0000-0004-200000000000";
    String activityId = "00000000-0000-0000-0010-100000000000";

    controller.deleteActivity(userId, activityId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteActivityForOtherUserNotRegisteredDenied() {
    String userId = "00000000-0000-0000-0004-800000000000";
    String activityId = "00000000-0000-0000-0010-800000000000";

    controller.deleteActivity(userId, activityId);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(String userId, String activityId) {
    Resources<Resource<ActivityEntity>> result = (Resources<Resource<ActivityEntity>>) controller
        .readActivities(userId, null).getBody();
    assertThat(result.getContent()).haveAtLeastOne(
        new Condition<>(p -> p.getContent().getId().equals(activityId), "activity exists"));
  }

  @SuppressWarnings("unchecked")
  private void assertNotContaining(String userId, String activityId) {
    Resources<Resource<ActivityEntity>> result = (Resources<Resource<ActivityEntity>>) controller
        .readActivities(userId, null).getBody();
    assertThat(result.getContent()).noneMatch(p -> p.getContent().getId().equals(activityId));
  }
}
