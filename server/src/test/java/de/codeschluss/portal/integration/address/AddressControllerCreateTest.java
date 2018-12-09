package de.codeschluss.portal.integration.address;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.address.AddressController;
import de.codeschluss.portal.components.address.AddressEntity;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
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
  public void addSuperUserOk() throws URISyntaxException {
    AddressEntity address = new AddressEntity("1", "addSuperUserOk", "1111", "addSuperUserOk", null,
        1, 1, null, null);

    controller.create(address);

    assertContaining(address);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void addProviderUserOk() throws URISyntaxException {
    AddressEntity address = new AddressEntity("1", "addProviderUserOk", "1111", "addProviderUserOk",
        null, 1, 1, null, null);

    controller.create(address);

    assertContaining(address);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void addSuperUserDuplicated() throws URISyntaxException {
    AddressEntity address = new AddressEntity("1", "wuppertal", "42103", "address1", null, 0, 0,
        null, null);

    controller.create(address);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("new@user")
  public void addNotApprovedProviderDenied() throws URISyntaxException {
    AddressEntity address = new AddressEntity("1", "addAdminNoProviderDenied", "1111",
        "addAdminNoProviderDenied", null, 1, 1, null, null);

    controller.create(address);
  }
  
  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("notapprovedorga@user")
  public void addNotApprovedOrgaDenied() throws URISyntaxException {
    AddressEntity address = new AddressEntity("1", "addNotApprovedOrgaDenied", "1111",
        "addNotApprovedOrgaDenied", null, 1, 1, null, null);

    controller.create(address);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addNoUserDenied() throws URISyntaxException {
    AddressEntity address = new AddressEntity("1", "addNoUserDenied", "1111", "addNoUserDenied",
        null, 1, 1, null, null);

    controller.create(address);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(AddressEntity address) {
    Resources<Resource<AddressEntity>> result = (Resources<Resource<AddressEntity>>) controller
        .readAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getStreet().equals(address.getStreet()), "address exists"));
  }
}
