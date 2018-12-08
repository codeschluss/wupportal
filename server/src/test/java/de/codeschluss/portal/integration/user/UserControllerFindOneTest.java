package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.components.user.UserEntity;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerFindOneTest {

  @Autowired
  private UserController controller;

  @Test
  @WithUserDetails("super@user")
  public void findOneOtherSuperUserOk() {
    String otherUserId = "00000000-0000-0000-0004-200000000000";

    Resource<UserEntity> result = (Resource<UserEntity>) controller.readOne(otherUserId);

    assertThat(result.getContent().getId()).isEqualTo(otherUserId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void findOneOwnUserOk() {
    String otherUserId = "00000000-0000-0000-0004-300000000000";

    Resource<UserEntity> result = (Resource<UserEntity>) controller.readOne(otherUserId);

    assertThat(result.getContent().getId()).isEqualTo(otherUserId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("admin@user")
  public void findOneOtherUserDenied() {
    String otherUserId = "00000000-0000-0000-0004-300000000000";

    controller.readOne(otherUserId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void findOneNotRegisteredDenied() {
    String otherUserId = "00000000-0000-0000-0004-300000000000";

    controller.readOne(otherUserId);
  }

}
