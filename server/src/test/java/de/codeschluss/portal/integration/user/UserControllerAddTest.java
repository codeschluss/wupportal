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
public class UserControllerAddTest {

  @Autowired
  private UserController controller;

  @Autowired
  private UserService service;

  @Test
  public void addWithoutSecurityOk() throws URISyntaxException {
    UserEntity user = new UserEntity("addWithoutSecurityOk", "test", "12345678", true,
        "addWithoutSecurityOk", null);

    controller.create(user);

    assertThat(service.userExists(user.getUsername())).isTrue();
  }

  @Test(expected = DuplicateEntryException.class)
  public void addWithoutSecurityDuplicated() throws URISyntaxException {
    UserEntity user = new UserEntity("test", "test", "12345678", true, "provider1@user", null);

    controller.create(user);
  }

}
