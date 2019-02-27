package de.codeschluss.portal.integration.address;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import de.codeschluss.portal.components.address.AddressController;
import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.components.address.bingmaps.MapService;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.BadParamsException;
import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AddressControllerCreateTest {

  @Autowired
  private AddressController controller;

  @MockBean
  private MapService mapService;

  @Test
  @WithUserDetails("super@user")
  public void createSuperUserOk() throws Exception {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address =
        newAddress("1", "createSuperUserOk", "1111", "createSuperUserOk", suburbId);
    given(this.mapService.retrieveExternalAddress(Mockito.any())).willReturn(address);

    controller.create(address);

    assertContaining(address);
  }

  @Test
  @WithUserDetails("new@user")
  public void createRegisteredUserOk() throws Exception {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", "createProviderUserOk", "1111", "createProviderUserOk",
        suburbId);
    given(this.mapService.retrieveExternalAddress(Mockito.any())).willReturn(address);

    controller.create(address);

    assertContaining(address);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidPlaceDenied() throws Exception {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", null, "42103", "createNotValidPostalCodeDenied",
        suburbId);

    controller.create(address);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidPostalCodeDenied() throws Exception {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", "createNotValidPostalCodeDenied", null,
        "createNotValidPostalCodeDenied", suburbId);

    controller.create(address);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void createNoUserDenied() throws Exception {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", "createNoUserDenied", "1111", "createNoUserDenied",
        suburbId);

    controller.create(address);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(AddressEntity address) {
    Resources<Resource<AddressEntity>> result = (Resources<Resource<AddressEntity>>) controller
        .readAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getStreet().equals(address.getStreet()), "address exists"));
  }

  private AddressEntity newAddress(String houseNumber, String place, String postalCode,
      String street, String suburbId) {
    AddressEntity address = new AddressEntity();
    address.setHouseNumber(houseNumber);
    address.setPlace(place);
    address.setPostalCode(postalCode);
    address.setStreet(street);
    address.setSuburbId(suburbId);
    return address;
  }
}
