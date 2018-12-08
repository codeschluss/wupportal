package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerReadActivitiesTest {

  @Autowired
  private UserController controller;

  @Test
  public void findActivitiesByUserOk() {

    Resources<?> result = (Resources<?>) controller
        .readActivities("00000000-0000-0000-0004-300000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test(expected = NotFoundException.class)
  public void findActivitiesByUserNotFound() {

    Resources<?> result = (Resources<?>) controller
        .readActivities("00000000-0000-0000-0004-XX0000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }
}
