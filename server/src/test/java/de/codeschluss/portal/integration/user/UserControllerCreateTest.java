package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.components.user.UserService;
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
  public void addWithoutSecurityOk() throws URISyntaxException {
    UserEntity user = newUser("addWithoutSecurityOk", "test", "12345678", true,
        "addWithoutSecurityOk");

    controller.create(user);

    assertThat(service.userExists(user.getUsername())).isTrue();
  }

  @Test(expected = DuplicateEntryException.class)
  public void addWithoutSecurityDuplicated() throws URISyntaxException {
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
