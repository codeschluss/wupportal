package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.functional.organisation.OrganisationController;
import de.codeschluss.portal.functional.provider.ProviderService;

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

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganisationControllerGrantAdminRightTest {

  @Autowired
  OrganisationController controller;

  @Autowired
  private ProviderService providerService;

  @Test
  @WithUserDetails("super@user")
  public void grantAdminRightsSuperUserOk() {
    String organisationId = "00000000-0000-0000-0008-200000000000";
    String userId = "00000000-0000-0000-0004-400000000000";
    assertThat(providerService.getProviderByUserAndOrganisation(userId, organisationId).isAdmin())
        .isFalse();

    ResponseEntity<?> result = (ResponseEntity<?>) controller.grantAdminRight(organisationId,
        userId, true);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    assertThat(providerService.getProviderByUserAndOrganisation(userId, organisationId).isAdmin())
        .isTrue();
  }

  @Test
  @WithUserDetails("admin@user")
  public void grantAdminRightsOwnAdminOk() {
    String organisationId = "00000000-0000-0000-0008-100000000000";
    String userId = "00000000-0000-0000-0004-400000000000";
    assertThat(providerService.getProviderByUserAndOrganisation(userId, organisationId).isAdmin())
        .isFalse();

    ResponseEntity<?> result = (ResponseEntity<?>) controller.grantAdminRight(organisationId,
        userId, true);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    assertThat(providerService.getProviderByUserAndOrganisation(userId, organisationId).isAdmin())
        .isTrue();
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void takeAdminRightsSupeUserBadRequest() {
    String notExistingOrganisationId = "12345678-0000-0000-0004-XX0000000000";
    String userId = "00000000-0000-0000-0004-400000000000";

    controller.grantAdminRight(notExistingOrganisationId, userId, false);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("new@user")
  public void takeAdminRightsProviderUserDenied() {
    String orgaId = "00000000-0000-0000-0004-300000000000";
    String userId = "00000000-0000-0000-0004-500000000000";

    controller.grantAdminRight(orgaId, userId, true);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void takeAdminRightsNoUserDenied() {
    String orgaId = "00000000-0000-0000-0004-300000000000";
    String userId = "00000000-0000-0000-0004-500000000000";

    controller.grantAdminRight(orgaId, userId, true);
  }

}
