package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.organisation.OrganisationService;
import de.codeschluss.portal.components.provider.ProviderService;

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
  public void addSuperUserOk() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(true, "addSuperUserOk", "add@SuperUserOk",
        "addSuperUserOk", "123456789", "addSuperUserOk", "addSuperUserOk");

    controller.create(organisation);

    assertThat(service.existsByName(organisation.getName())).isTrue();
  }

  @Test
  @WithUserDetails("createorga@user")
  @SuppressWarnings("unchecked")
  public void addCreateOrgaOk() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(false, "addCreateOrgaOk",
        "addCreateOrgaOk@addCreateOrgaOk", "addCreateOrgaOk", "123456789", "addCreateOrgaOk",
        "addCreateOrgaOk");

    OrganisationEntity savedOrga = ((Resource<OrganisationEntity>) controller.create(organisation)
        .getBody()).getContent();

    assertThat(service.existsByName(savedOrga.getName())).isTrue();
    assertThat(service.getById(savedOrga.getId()).isApproved()).isFalse();

    assertThat(providerService.getProvidersByOrganisation(savedOrga.getId())).haveAtLeastOne(
        new Condition<>(p -> p.getUser().getUsername().equals("createorga@user"), "user exists"));
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addNoUserDenied() throws URISyntaxException {
    OrganisationEntity organisation = newOrganisation(true, "addNoUserDenied",
        "addNoUserDenied", "addNoUserDenied", "123456789", "addNoUserDenied", "addNoUserDenied");

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
