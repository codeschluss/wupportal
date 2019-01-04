package de.codeschluss.portal.integration.address;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.address.AddressController;
import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

import java.net.URISyntaxException;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AddressControllerCreateTest {

  @Autowired
  private AddressController controller;

  @Test
  @WithUserDetails("super@user")
  public void createSuperUserOk() throws URISyntaxException {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", "createSuperUserOk", "1111", "createSuperUserOk",
        suburbId);

    controller.create(address);

    assertContaining(address);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void createProviderUserOk() throws URISyntaxException {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", "createProviderUserOk", "1111", "createProviderUserOk",
        suburbId);

    controller.create(address);

    assertContaining(address);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidPlaceDenied() throws URISyntaxException {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", null, "42103", "createNotValidPostalCodeDenied",
        suburbId);

    controller.create(address);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidPostalCodeDenied() throws URISyntaxException {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", "createNotValidPostalCodeDenied", null,
        "createNotValidPostalCodeDenied", suburbId);

    controller.create(address);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void createSuperUserDuplicated() throws URISyntaxException {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", "wuppertal", "42103", "address1", suburbId);

    controller.create(address);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("new@user")
  public void createNotApprovedProviderDenied() throws URISyntaxException {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", "createNotApprovedProviderDenied", "1111",
        "createNotApprovedProviderDenied", suburbId);

    controller.create(address);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("notapprovedorga@user")
  public void createNotApprovedOrgaDenied() throws URISyntaxException {
    String suburbId = "00000000-0000-0000-0005-100000000000";
    AddressEntity address = newAddress("1", "createNotApprovedOrgaDenied", "1111",
        "createNotApprovedOrgaDenied", suburbId);

    controller.create(address);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void createNoUserDenied() throws URISyntaxException {
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
