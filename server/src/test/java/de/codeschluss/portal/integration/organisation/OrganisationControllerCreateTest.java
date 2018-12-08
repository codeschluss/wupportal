package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.organisation.OrganisationService;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

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
public class OrganisationControllerCreateTest {

  @Autowired
  private OrganisationController controller;

  @Autowired
  private OrganisationService service;

  @Test
  @WithUserDetails("super@user")
  public void addSuperUserOk() throws URISyntaxException {
    OrganisationEntity organisation = new OrganisationEntity("addSuperUserOk", "add@SuperUserOk",
        "addSuperUserOk", "123456789", "addSuperUserOk", "addSuperUserOk", null, null, null, null);

    controller.create(organisation);

    assertThat(service.existsByName(organisation.getName())).isTrue();
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void addSuperUserDuplicated() throws URISyntaxException {
    OrganisationEntity organisation = new OrganisationEntity("organisation1", "organisation1",
        "organisation1", "123456789", "organisation1", "organisation1", null, null, null, null);

    controller.create(organisation);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addProviderDenied() throws URISyntaxException {
    OrganisationEntity organisation = new OrganisationEntity("addProviderDenied",
        "addProviderDenied", "addProviderDenied", "123456789", "addProviderDenied",
        "addProviderDenied", null, null, null, null);

    controller.create(organisation);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addNoUserDenied() throws URISyntaxException {
    OrganisationEntity organisation = new OrganisationEntity("addNoUserDenied", "addNoUserDenied",
        "addNoUserDenied", "123456789", "addNoUserDenied", "addNoUserDenied", null, null, null,
        null);

    controller.create(organisation);
  }

}
