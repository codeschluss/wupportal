package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.core.api.dto.BooleanPrimitive;
import de.codeschluss.portal.core.exception.BadParamsException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback
public class UserControllerGrantSuperuserRightTest {

  @Autowired
  private UserController controller;

  @Test
  @WithUserDetails("super@user")
  public void grantSuperuserOk() {
    String otherUserId = "00000000-0000-0000-0004-110000000000";
    BooleanPrimitive value = new BooleanPrimitive(true);
    
    ResponseEntity<?> result = (ResponseEntity<?>) controller.grantSuperuserRight(otherUserId,
        value);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    assertThat(controller.readOne(otherUserId).getContent().isSuperuser()).isTrue();
  }

  @Test
  @WithUserDetails("super@user")
  public void takeSuperuserOk() {
    String otherUserId = "00000000-0000-0000-0004-120000000000";
    BooleanPrimitive value = new BooleanPrimitive(false);

    ResponseEntity<?> result = (ResponseEntity<?>) controller.grantSuperuserRight(otherUserId,
        value);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    assertThat(controller.readOne(otherUserId).getContent().isSuperuser()).isFalse();
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void takeSuperuserBadRequest() {
    String notExistingUserId = "12345678-0000-0000-0004-XX0000000000";
    BooleanPrimitive value = new BooleanPrimitive(false);

    controller.grantSuperuserRight(notExistingUserId, value);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void grantSuperuserDenied() {
    String otherUserId = "00000000-0000-0000-0004-200000000000";
    BooleanPrimitive value = new BooleanPrimitive(true);

    controller.grantSuperuserRight(otherUserId, value);
  }

}
