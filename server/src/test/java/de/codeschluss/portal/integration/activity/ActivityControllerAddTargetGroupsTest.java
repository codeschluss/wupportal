package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.targetgroup.TargetGroupEntity;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

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
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ActivityControllerAddTargetGroupsTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("super@user")
  public void addTargetGroupsSuperUserOk() throws URISyntaxException {
    List<String> targetGroupId = new ArrayList<>();
    targetGroupId.add("00000000-0000-0000-0003-100000000000");
    String activityId = "00000000-0000-0000-0010-100000000000";

    controller.addTargetGroups(activityId, targetGroupId);

    assertContaining(targetGroupId, activityId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void addTargetGroupsProviderOk() throws URISyntaxException {
    List<String> targetGroupId = new ArrayList<>();
    targetGroupId.add("00000000-0000-0000-0003-100000000000");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.addTargetGroups(activityId, targetGroupId);

    assertContaining(targetGroupId, activityId);
  }

  @Test
  @WithUserDetails("admin@user")
  public void addTargetGroupsAdminOk() throws URISyntaxException {
    List<String> targetGroupId = new ArrayList<>();
    targetGroupId.add("00000000-0000-0000-0003-200000000000");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.addTargetGroups(activityId, targetGroupId);

    assertContaining(targetGroupId, activityId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addTargetGroupsOtherProviderDenied() throws URISyntaxException {
    List<String> targetGroupId = new ArrayList<>();
    targetGroupId.add("00000000-0000-0000-0003-200000000000");
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.addTargetGroups(activityId, targetGroupId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addTargetGroupsNoUserDenied() throws URISyntaxException {
    List<String> targetGroupId = new ArrayList<>();
    targetGroupId.add("00000000-0000-0000-0003-200000000000");
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.addTargetGroups(activityId, targetGroupId);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(List<String> targetGroupIds, String activityId) {
    Resources<Resource<TargetGroupEntity>> result = (Resources<Resource<TargetGroupEntity>>) 
        controller.readTargetGroups(activityId, null).getBody();
    
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        t -> targetGroupIds.contains(t.getContent().getId()), "targetGroup exists"));
  }
}
