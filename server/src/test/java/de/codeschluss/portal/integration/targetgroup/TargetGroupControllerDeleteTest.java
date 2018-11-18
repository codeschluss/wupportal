package de.codeschluss.portal.integration.targetgroup;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.functional.targetgroup.TargetGroupController;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TargetGroupControllerDeleteTest {

  @Autowired
  private TargetGroupController controller;

  @Test(expected = NotFoundException.class)
  @WithUserDetails("super@user")
  public void deleteSuperUserOk() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-700000000000";
    assertThat(controller.findOne(targetGroupId)).isNotNull();

    controller.delete(targetGroupId);

    controller.findOne(targetGroupId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void deleteProviderUserDenied() throws URISyntaxException {
    String targetGroupId = "00000000-0000-0000-0003-100000000000";

    controller.delete(targetGroupId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteOtherNotRegisteredDenied() {
    String targetGroupId = "00000000-0000-0000-0003-100000000000";

    controller.delete(targetGroupId);
  }

}
