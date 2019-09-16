package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.user.UserController;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerReadOrganisationTest {

  @Autowired
  private UserController controller;

  @Test
  @WithUserDetails("super@user")
  public void findProvidersByUserSuperUserOk() {
    Resources<?> result = (Resources<?>) controller
        .readOrganisations("00000000-0000-0000-0004-300000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("admin@user")
  public void findAllWithAdminUserDenied() {
    controller.readOrganisations("00000000-0000-0000-0004-300000000000");
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void findAllWithProviderUserDenied() {
    controller.readOrganisations("00000000-0000-0000-0004-400000000000");
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void findAllWithNoUserUserUserDenied() {
    controller.readOrganisations("00000000-0000-0000-0004-400000000000");
  }
}
