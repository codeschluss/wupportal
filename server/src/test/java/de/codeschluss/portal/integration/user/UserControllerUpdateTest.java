package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.components.user.UserService;
import de.codeschluss.portal.core.exception.BadParamsException;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
public class UserControllerUpdateTest {

  @Autowired
  private UserController controller;

  @Autowired
  private UserService service;

  @Test
  @WithUserDetails("provider1@user")
  public void updateOwnUserOk() throws URISyntaxException {
    UserEntity user = newUser("provider1@user", "test", "12345678", true,
        "updateWithoutSecurityOk");

    controller.update(user, "00000000-0000-0000-0004-300000000000");

    assertThat(service.getUser(user.getUsername()).getUsername()).isEqualTo(user.getUsername());
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("provider1@user")
  public void updateNotValidUsernameDenied() throws URISyntaxException {
    UserEntity user = newUser("updateNotValidUsernameDenied", "test", "12345678", true, null);

    controller.update(user, "00000000-0000-0000-0004-300000000000");
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("provider1@user")
  public void updateNotValidPasswordDenied() throws URISyntaxException {
    UserEntity user = newUser("updateNotValidPasswordDenied", null, "12345678", true,
        "updateNotValidPasswordDenied");

    controller.update(user, "00000000-0000-0000-0004-300000000000");
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider2@user")
  public void updateOtherUserDenied() throws URISyntaxException {
    UserEntity user = newUser("provider1@user", "test", "12345678", true,
        "updateWithoutSecurityOk");

    controller.update(user, "00000000-0000-0000-0004-300000000000");
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateOtherNotRegisteredUserDenied() throws URISyntaxException {
    UserEntity user = newUser("provider1@user", "test", "12345678", true,
        "updateWithoutSecurityOk");

    controller.update(user, "00000000-0000-0000-0004-300000000000");
  }

  private UserEntity newUser(String name, String password, String phone, boolean superuser,
      String username) {
    UserEntity user = new UserEntity();
    user.setName(name);
    user.setPassword(password);
    user.setPhone(phone);
    user.setSuperuser(superuser);
    user.setUsername(username);
    return user;
  }

}
