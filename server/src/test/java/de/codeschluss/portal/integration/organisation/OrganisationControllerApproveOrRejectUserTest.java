package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.components.provider.ProviderService;
import de.codeschluss.portal.core.api.dto.BooleanPrimitive;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.integration.SmtpServerRule;

import javax.mail.MessagingException;

import org.junit.Rule;
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
public class OrganisationControllerApproveOrRejectUserTest {

  @Autowired
  private OrganisationController controller;

  @Autowired
  private ProviderService providerService;

  @Rule
  public SmtpServerRule smtpServerRule = new SmtpServerRule(2525);

  @Test
  @WithUserDetails("super@user")
  public void approveSuperUserOk() {
    String organisationId = "00000000-0000-0000-0008-200000000000";
    String userId = "00000000-0000-0000-0004-800000000000";
    assertThat(
        providerService.getProviderByUserAndOrganisation(userId, organisationId).isApproved())
            .isFalse();
    BooleanPrimitive value = new BooleanPrimitive(true);

    ResponseEntity<?> result = (ResponseEntity<?>) controller.approveOrRejectUser(organisationId,
        userId, value);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    assertThat(
        providerService.getProviderByUserAndOrganisation(userId, organisationId).isApproved())
            .isTrue();
    assertMailSent();
  }

  @Test
  @WithUserDetails("admin@user")
  public void rejectOwnAdminOk() {
    String organisationId = "00000000-0000-0000-0008-100000000000";
    String userId = "00000000-0000-0000-0004-400000000000";
    assertThat(
        providerService.getProviderByUserAndOrganisation(userId, organisationId).isApproved())
            .isTrue();
    BooleanPrimitive value = new BooleanPrimitive(false);

    ResponseEntity<?> result = (ResponseEntity<?>) controller.approveOrRejectUser(organisationId,
        userId, value);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    assertThat(
        providerService.getProviderByUserAndOrganisation(userId, organisationId).isApproved())
            .isFalse();
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void rejectSupeUserBadRequest() {
    String notExistingOrganisationId = "12345678-0000-0000-0004-XX0000000000";
    String userId = "00000000-0000-0000-0004-400000000000";
    BooleanPrimitive value = new BooleanPrimitive(false);

    controller.approveOrRejectUser(notExistingOrganisationId, userId, value);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("new@user")
  public void approveProviderUserDenied() {
    String orgaId = "00000000-0000-0000-0004-300000000000";
    String userId = "00000000-0000-0000-0004-500000000000";
    BooleanPrimitive value = new BooleanPrimitive(true);

    controller.approveOrRejectUser(orgaId, userId, value);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void approveNoUserDenied() {
    String orgaId = "00000000-0000-0000-0004-300000000000";
    String userId = "00000000-0000-0000-0004-500000000000";
    BooleanPrimitive value = new BooleanPrimitive(true);

    controller.approveOrRejectUser(orgaId, userId, value);
  }
  
  private void assertMailSent() {
    assertThat(smtpServerRule.getMessages()).anyMatch(message -> {
      try {
        return message.getSubject().contains("Freigabe als Anbieter");
      } catch (MessagingException e) {
        e.printStackTrace();
      }
      return false;
    });
  }
}
