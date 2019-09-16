package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.components.organisation.OrganisationService;
import de.codeschluss.portal.core.api.dto.StringPrimitive;
import de.codeschluss.portal.core.exception.BadParamsException;

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
public class OrganisationControllerUpdateAddressTest {

  @Autowired
  private OrganisationController controller;

  @Autowired
  private OrganisationService service;

  @Test
  @WithUserDetails("super@user")
  public void updateAddressSuperUserOk() {
    String orgaId = "00000000-0000-0000-0008-300000000000";
    StringPrimitive addressId = new StringPrimitive("00000000-0000-0000-0006-100000000000");

    controller.updateAddress(orgaId, addressId);

    assertThat(service.getById(orgaId).getAddress().getId()).isEqualTo(addressId.getValue());
  }

  @Test
  @WithUserDetails("admin@user")
  public void updateAddressOwnOrgaOk() {
    String orgaId = "00000000-0000-0000-0008-100000000000";
    StringPrimitive addressId = new StringPrimitive("00000000-0000-0000-0006-400000000000");

    controller.updateAddress(orgaId, addressId);

    assertThat(service.getById(orgaId).getAddress().getId()).isEqualTo(addressId.getValue());
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateAddressSuperUserWrongOrgaDenied() {
    String orgaId = "00000000-0000-0000-0008-XX0000000000";
    StringPrimitive addressId = new StringPrimitive("00000000-0000-0000-0006-100000000000");

    controller.updateAddress(orgaId, addressId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("admin@user")
  public void updateAddressOwnOrgaWrongAddressDenied() {
    String orgaId = "00000000-0000-0000-0008-100000000000";
    StringPrimitive addressId = new StringPrimitive("00000000-0000-0000-0006-XX0000000000");

    controller.updateAddress(orgaId, addressId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateAddressOtherOrgaDenied() {
    String orgaId = "00000000-0000-0000-0008-300000000000";
    StringPrimitive addressId = new StringPrimitive("00000000-0000-0000-0006-400000000000");

    controller.updateAddress(orgaId, addressId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateAddressNoUserDenied() {
    String orgaId = "00000000-0000-0000-0008-300000000000";
    StringPrimitive addressId = new StringPrimitive("00000000-0000-0000-0006-400000000000");

    controller.updateAddress(orgaId, addressId);
  }

}
