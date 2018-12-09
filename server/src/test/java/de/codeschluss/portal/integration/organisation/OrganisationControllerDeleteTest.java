package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
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
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class OrganisationControllerDeleteTest {

  @Autowired
  private OrganisationController controller;

  @Test(expected = NotFoundException.class)
  @WithUserDetails("super@user")
  public void deleteOtherSuperUserOk() throws URISyntaxException {
    String organisationId = "00000000-0000-0000-0008-120000000000";
    assertThat(controller.readOne(organisationId)).isNotNull();

    controller.delete(organisationId);

    controller.readOne(organisationId);
  }

  @Test(expected = NotFoundException.class)
  @WithUserDetails("admin@user")
  public void deleteOwnUserOk() throws URISyntaxException {
    String organisationId = "00000000-0000-0000-0008-500000000000";
    assertThat(controller.readOne(organisationId)).isNotNull();

    controller.delete(organisationId);

    controller.readOne(organisationId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void deleteOtherUserDenied() throws URISyntaxException {
    String organisationId = "00000000-0000-0000-0008-100000000000";

    controller.delete(organisationId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteOtherNotRegisteredDenied() {
    String otherOrganisationId = "00000000-0000-0000-0008-100000000000";

    controller.delete(otherOrganisationId);
  }

}
