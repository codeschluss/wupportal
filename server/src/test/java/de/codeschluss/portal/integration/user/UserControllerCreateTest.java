package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.components.user.UserService;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserControllerCreateTest {

  @Autowired
  private UserController controller;

  @Autowired
  private UserService service;

  @Test
  public void createWithoutSecurityOk() throws URISyntaxException {
    UserEntity user = newUser("createWithoutSecurityOk", "test", "12345678", true,
        "createWithoutSecurityOk");

    controller.create(user);

    assertThat(service.userExists(user.getUsername())).isTrue();
  }

  @Test(expected = BadParamsException.class)
  public void createNotValidUsernameDenied() throws URISyntaxException {
    UserEntity user = newUser("createNotValidUsernameDenied", "test", "12345678", true, null);

    controller.create(user);
  }

  @Test(expected = BadParamsException.class)
  public void createNotValidPasswordDenied() throws URISyntaxException {
    UserEntity user = newUser("createNotValidPasswordDenied", null, "12345678", true,
        "createNotValidPasswordDenied");

    controller.create(user);
  }

  @Test(expected = DuplicateEntryException.class)
  public void createWithoutSecurityDuplicated() throws URISyntaxException {
    UserEntity user = newUser("test", "test", "12345678", true, "provider1@user");

    controller.create(user);
  }

  private UserEntity newUser(String fullname, String password, String phone, boolean superuser,
      String username) {
    UserEntity user = new UserEntity();
    user.setFullname(fullname);
    user.setPassword(password);
    user.setPhone(phone);
    user.setSuperuser(superuser);
    user.setUsername(username);
    return user;
  }

}
