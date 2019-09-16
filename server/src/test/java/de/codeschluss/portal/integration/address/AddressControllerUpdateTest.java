package de.codeschluss.portal.integration.address;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.address.AddressController;
import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback
public class AddressControllerUpdateTest {

  @Autowired
  private AddressController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    AddressEntity address = newAddress("2", "wuppertal", "42103", "changed");
    String addressId = "00000000-0000-0000-0006-200000000000";

    controller.update(address, addressId);

    Resource<AddressEntity> result = (Resource<AddressEntity>) controller.readOne(addressId);
    assertThat(result.getContent().getStreet()).isEqualTo(address.getStreet());
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateNotValidPlaceDenied() throws URISyntaxException {
    AddressEntity address = newAddress("1", null, "42103", "updateNotValidPlaceDenied");
    String addressId = "00000000-0000-0000-0006-200000000000";

    controller.update(address, addressId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateNotValidPostalCodeDenied() throws URISyntaxException {
    AddressEntity address = newAddress("1", "createNotValidPostalCodeDenied", null,
        "createNotValidPostalCodeDenied");
    String addressId = "00000000-0000-0000-0006-200000000000";

    controller.update(address, addressId);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void updateSuperUserDuplicated() throws URISyntaxException {
    AddressEntity address = newAddress("1", "wuppertal", "42103", "address1");
    String addressId = "00000000-0000-0000-0006-200000000000";

    controller.update(address, addressId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderUserDenied() throws URISyntaxException {
    AddressEntity address = newAddress("2", "wuppertal", "42103", "changed");
    String addressId = "00000000-0000-0000-0006-100000000000";

    controller.update(address, addressId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    AddressEntity address = newAddress("2", "wuppertal", "42103", "changed");
    String addressId = "00000000-0000-0000-0006-100000000000";

    controller.update(address, addressId);
  }
  
  private AddressEntity newAddress(
      String houseNumber, String place, String postalCode, String street) {
    AddressEntity address = new AddressEntity();
    address.setHouseNumber(houseNumber);
    address.setPlace(place);
    address.setPostalCode(postalCode);
    address.setStreet(street);
    return address;
  }

}
