package de.codeschluss.portal.integration.address;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.address.AddressController;
import de.codeschluss.portal.core.exception.NotFoundException;

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
public class AddressControllerDeleteTest {

  @Autowired
  private AddressController controller;

  @Test(expected = NotFoundException.class)
  @WithUserDetails("super@user")
  public void deleteSuperUserOk() throws URISyntaxException {
    String addressId = "00000000-0000-0000-0006-30000000000";
    assertThat(controller.findOne(addressId)).isNotNull();

    controller.delete(addressId);

    controller.findOne(addressId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void deleteProviderUserDenied() throws URISyntaxException {
    String addressId = "00000000-0000-0000-0006-10000000000";

    controller.delete(addressId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteNotRegisteredDenied() {
    String addressId = "00000000-0000-0000-0006-10000000000";

    controller.delete(addressId);
  }

}
