package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.components.organisation.OrganisationService;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class OrganisationControllerGrantApprovalTest {

  @Autowired
  private OrganisationController controller;

  @Autowired
  private OrganisationService service;

  @Test
  @WithUserDetails("super@user")
  public void grantApprovalSuperUserOk() throws URISyntaxException {
    String organisationId = "00000002-0000-0000-0008-000000000000";
    boolean isApproved = true;
    assertThat(service.getById(organisationId).isApproved()).isFalse();

    ResponseEntity<?> result = (ResponseEntity<?>) controller.grantApproval(organisationId,
        isApproved);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    assertThat(service.getById(organisationId).isApproved()).isTrue();
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("notapprovedorga2@user")
  public void grantApprovalOwnUserDenied() throws URISyntaxException {
    String organisationId = "00000003-0000-0000-0008-000000000000";
    boolean isApproved = true;
    assertThat(service.getById(organisationId).isApproved()).isFalse();

    controller.grantApproval(organisationId, isApproved);

    controller.readOne(organisationId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void grantApprovalOtherNotRegisteredDenied() {
    String organisationId = "00000003-0000-0000-0008-000000000000";
    boolean isApproved = true;
    assertThat(service.getById(organisationId).isApproved()).isFalse();

    controller.grantApproval(organisationId, isApproved);

    controller.readOne(organisationId);
  }

}
