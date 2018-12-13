package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.organisation.OrganisationService;
import de.codeschluss.portal.components.provider.ProviderService;
import de.codeschluss.portal.core.exception.BadParamsException;

import java.net.URISyntaxException;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class OrganisationControllerCreateTest {

  @Autowired
  private OrganisationController controller;

  @Autowired
  private OrganisationService service;

  @Autowired
  private ProviderService providerService;

  @Test
  @WithUserDetails("super@user")
  public void createSuperUserOk() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(true, "createSuperUserOk",
        "create@SuperUserOk", "createSuperUserOk", "123456789", "createSuperUserOk",
        "createSuperUserOk");

    controller.create(organisation);

    assertThat(service.existsByName(organisation.getName())).isTrue();
  }

  @Test
  @WithUserDetails("createorga@user")
  @SuppressWarnings("unchecked")
  public void createCreateOrgaOk() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(false, "createCreateOrgaOk",
        "createCreateOrgaOk@createCreateOrgaOk", "createCreateOrgaOk", "123456789",
        "createCreateOrgaOk", "createCreateOrgaOk");

    OrganisationEntity savedOrga = ((Resource<OrganisationEntity>) controller.create(organisation)
        .getBody()).getContent();

    assertThat(service.existsByName(savedOrga.getName())).isTrue();
    assertThat(service.getById(savedOrga.getId()).isApproved()).isFalse();

    assertThat(providerService.getProvidersByOrganisation(savedOrga.getId())).haveAtLeastOne(
        new Condition<>(p -> p.getUser().getUsername().equals("createorga@user"), "user exists"));
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidOk() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(true, "createSuperUserOk",
        "create@SuperUserOk", null, "123456789", "createSuperUserOk",
        "createSuperUserOk");

    controller.create(organisation);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void createNoUserDenied() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(true, "createNoUserDenied",
        "createNoUserDenied", "createNoUserDenied", "123456789", "createNoUserDenied",
        "createNoUserDenied");

    controller.create(organisation);
  }

  private OrganisationEntity newOrganisation(boolean approved, String description, String mail,
      String name, String phone, String videoUrl, String website) {
    OrganisationEntity organisation = new OrganisationEntity();
    organisation.setApproved(approved);
    organisation.setDescription(description);
    organisation.setMail(mail);
    organisation.setName(name);
    organisation.setPhone(phone);
    organisation.setVideoUrl(videoUrl);
    organisation.setWebsite(website);

    return organisation;
  }

}
