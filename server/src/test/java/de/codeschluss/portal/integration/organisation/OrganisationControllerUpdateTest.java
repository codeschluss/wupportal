package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.organisation.OrganisationService;
import de.codeschluss.portal.core.exception.BadParamsException;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@Rollback
public class OrganisationControllerUpdateTest {

  @Autowired
  private OrganisationController controller;

  @Autowired
  private OrganisationService service;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    String organisationId = "00000000-0000-0000-0008-300000000000";
    OrganisationEntity organisation = newOrganisation(true, "updateSuperUserOk",
        "updateSuperUserOk", "updateSuperUserOk", "123456789", "updateSuperUserOk",
        "updateSuperUserOk", "00000000-0000-0000-0006-100000000000");

    controller.update(organisation, organisationId);

    OrganisationEntity updateOrganisation = service.getById(organisationId);
    assertThat(updateOrganisation.getName()).isEqualTo(organisation.getName());
    assertThat(updateOrganisation.getDescription()).isEqualTo(organisation.getDescription());
  }

  @Test
  @WithUserDetails("admin@user")
  public void updateOwnOrganisationOk() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(true, "updateOwnOrganisationOk",
        "updateOwnOrganisationOk", "organisation1", "123456789", "updateOwnOrganisationOk",
        "updateOwnOrganisationOk", "00000000-0000-0000-0006-100000000000");

    controller.update(organisation, "00000000-0000-0000-0008-100000000000");

    assertThat(service.existsByName(organisation.getName()));
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateNotValidNameOk() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(true, "updateNotValidNameOk",
        "update@SuperUserOk", null, "123456789", "updateNotValidNameOk", "updateNotValidNameOk",
        "00000000-0000-0000-0006-100000000000");

    controller.update(organisation, "00000000-0000-0000-0008-100000000000");
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateNotValidAddressOk() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(true, "updateNotValidAddressOk",
        "update@NotValidAddressOk", null, "123456789", "updateNotValidAddressOk",
        "updateNotValidAddressOk", null);

    controller.update(organisation, "00000000-0000-0000-0008-100000000000");
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateOtherOrganisationDenied() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(true, "updateOtherOrganisationDenied",
        "updateOtherOrganisationDenied", "updateOtherOrganisationDenied", "123456789",
        "updateOtherOrganisationDenied", "updateOtherOrganisationDenied",
        "00000000-0000-0000-0006-100000000000");

    controller.update(organisation, "00000000-0000-0000-0008-100000000000");
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateOtherNotRegisteredOrganisationDenied() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(true, "updateOtherOrganisationDenied",
        "organisation1", "organisation1", "123456789", "organisation1", "organisation1",
        "00000000-0000-0000-0006-100000000000");

    controller.update(organisation, "00000000-0000-0000-0008-100000000000");
  }

  private OrganisationEntity newOrganisation(boolean approved, String description, String mail,
      String name, String phone, String videoUrl, String website, String addressId) {
    OrganisationEntity organisation = new OrganisationEntity();
    organisation.setApproved(approved);
    organisation.setDescription(description);
    organisation.setMail(mail);
    organisation.setName(name);
    organisation.setPhone(phone);
    organisation.setVideoUrl(videoUrl);
    organisation.setWebsite(website);
    organisation.setAddressId(addressId);

    return organisation;
  }

}
