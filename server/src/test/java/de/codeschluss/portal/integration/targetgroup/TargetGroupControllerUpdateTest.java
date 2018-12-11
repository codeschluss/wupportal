package de.codeschluss.portal.integration.targetgroup;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.targetgroup.TargetGroupController;
import de.codeschluss.portal.components.targetgroup.TargetGroupEntity;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

import java.net.URISyntaxException;

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

@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback
public class TargetGroupControllerUpdateTest {

  @Autowired
  private TargetGroupController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    TargetGroupEntity targetGroup = newTargetGroup("updateSuperUserOk", "updateSuperUserOk");
    String targetGroupId = "00000000-0000-0000-0003-800000000000";

    controller.update(targetGroup, targetGroupId);

    Resource<TargetGroupEntity> result = (Resource<TargetGroupEntity>) controller
        .readOne(targetGroupId);
    assertThat(result.getContent().getName()).isEqualTo(targetGroup.getName());
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void updateSuperUserDuplicatedName() throws URISyntaxException {
    TargetGroupEntity targetGroup = newTargetGroup("target1", "target1");
    String targetGroupId = "00000000-0000-0000-0003-800000000000";

    controller.update(targetGroup, targetGroupId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderUserDenied() throws URISyntaxException {
    TargetGroupEntity targetGroup = newTargetGroup("updateProviderUserDenied",
        "updateProviderUserDenied");
    String targetGroupId = "00000000-0000-0000-0003-100000000000";

    controller.update(targetGroup, targetGroupId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    TargetGroupEntity targetGroup = newTargetGroup("updateNoUserDenied", "updateNoUserDenied");
    String targetGroupId = "00000000-0000-0000-0003-100000000000";

    controller.update(targetGroup, targetGroupId);
  }

  private TargetGroupEntity newTargetGroup(String description, String name) {
    TargetGroupEntity targetGroup = new TargetGroupEntity();
    targetGroup.setDescription(description);
    targetGroup.setName(name);
    return targetGroup;
  }

}
