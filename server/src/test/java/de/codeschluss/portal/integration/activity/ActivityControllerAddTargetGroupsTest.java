package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.targetgroup.TargetGroupEntity;

import java.net.URISyntaxException;

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
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerAddTargetGroupsTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("super@user")
  public void addTargetGroupsSuperUserOk() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-100000000000";
    String activityId = "00000000-0000-0000-0010-100000000000";

    controller.addTargetGroups(activityId, targetGroupId);

    assertContaining(targetGroupId, activityId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void addTargetGroupsProviderOk() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-100000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.addTargetGroups(activityId, targetGroupId);

    assertContaining(targetGroupId, activityId);
  }

  @Test
  @WithUserDetails("admin@user")
  public void addTargetGroupsAdminOk() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-200000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.addTargetGroups(activityId, targetGroupId);

    assertContaining(targetGroupId, activityId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addTargetGroupsOtherProviderDenied() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-200000000000";
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.addTargetGroups(activityId, targetGroupId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addTargetGroupsNoUserDenied() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-200000000000";
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.addTargetGroups(activityId, targetGroupId);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(String targetGroupId, String activityId) {
    Resources<Resource<TargetGroupEntity>> result = (Resources<Resource<TargetGroupEntity>>) 
        controller.findTargetGroups(activityId).getBody();
    
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        t -> t.getContent().getId().equals(targetGroupId), "targetGroup exists"));
  }
}
