package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.activity.ActivityEntity;

import java.net.URISyntaxException;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
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
public class ActivityControllerDeleteTargetGroupTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("super@user")
  public void deleteTargetGroupsSuperUserOk() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-200000000000";
    String activityId = "00000000-0000-0000-0010-100000000000";

    assertContaining(activityId, targetGroupId);

    controller.deleteTargetGroups(activityId, targetGroupId);

    assertNotContaining(activityId, targetGroupId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void deleteTargetGroupsProviderOk() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-200000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    assertContaining(activityId, targetGroupId);

    controller.deleteTargetGroups(activityId, targetGroupId);

    assertNotContaining(activityId, targetGroupId);
  }

  @Test
  @WithUserDetails("admin@user")
  public void deleteTargetGroupsAdminOk() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-300000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    assertContaining(activityId, targetGroupId);

    controller.deleteTargetGroups(activityId, targetGroupId);

    assertNotContaining(activityId, targetGroupId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider2@user")
  public void deleteTargetGroupsOtherProviderDenied() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-100000000000";
    String activityId = "00000000-0000-0000-0010-900000000000";

    controller.deleteTargetGroups(activityId, targetGroupId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteTargetGroupsNoUserDenied() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-100000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.deleteTargetGroups(activityId, targetGroupId);
  }

  private void assertContaining(String activityId, String targetGroupId) {
    Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
    assertThat(result.getContent().getTargetGroups()).haveAtLeastOne(
        new Condition<>(t -> t.getId().equals(targetGroupId), "targetGroup exists"));
  }

  private void assertNotContaining(String activityId, String targetGroupId) {
    Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
    assertThat(result.getContent().getTargetGroups())
        .noneMatch(t -> t.getId().equals(targetGroupId));
  }
}
