package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.integration.SmtpServerRule;

import java.util.Arrays;

import javax.mail.MessagingException;

import org.assertj.core.api.Condition;
import org.junit.Rule;
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
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserControllerAddOrganisationTest {

  @Autowired
  private UserController controller;

  @Rule
  public SmtpServerRule smtpServerRule = new SmtpServerRule(2525);

  @Test
  @WithUserDetails("super@user")
  public void addSingleOrganisationForOtherUserSuperUserOk() {
    String userId = "00000000-0000-0000-0004-300000000000";
    String orgaId = "00000000-0000-0000-0008-200000000000";

    controller.addOrganisation(userId, orgaId).getBody();

    assertContaining(userId, orgaId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void addMultipleOrganisationForOwnUserOk() throws MessagingException {
    String userId = "00000000-0000-0000-0004-300000000000";
    String orgaId1 = "00000000-0000-0000-0008-300000000000";
    String orgaId2 = "00000000-0000-0000-0008-600000000000";
    String[] requestBody = new String[2];
    requestBody[0] = orgaId1;
    requestBody[1] = orgaId2; 
    
    controller.addOrganisation(userId, requestBody).getBody();
    
    assertThat(smtpServerRule.getMessages()).isNotEmpty();
    assertContaining(userId, orgaId1, orgaId2);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void addOrganisationFilterDuplicateOrgasForOwnUserOk() {
    String userId = "00000000-0000-0000-0004-300000000000";
    String orgaId1 = "00000000-0000-0000-0008-500000000000";
    String orgaId2 = "00000000-0000-0000-0008-500000000000";
    String[] requestBody = new String[2];
    requestBody[0] = orgaId1;
    requestBody[1] = orgaId2;

    controller.addOrganisation(userId, requestBody).getBody();

    assertThat(smtpServerRule.getMessages()).isNotEmpty();
    assertContaining(userId, orgaId1);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("provider1@user")
  public void addDuplicateOrganisationForOwnUserDenied() {
    String userId = "00000000-0000-0000-0004-300000000000";
    String orgaId = "00000000-0000-0000-0008-100000000000";

    controller.addOrganisation(userId, orgaId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addOrganisationForOtherUserDenied() {
    String userId = "00000000-0000-0000-0004-400000000000";
    String orgaId = "00000000-0000-0000-0008-300000000000";

    controller.addOrganisation(userId, orgaId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addOrganisationForOtherUserNotRegisteredDenied() {
    String userId = "00000000-0000-0000-0004-400000000000";
    String orgaId = "00000000-0000-0000-0008-300000000000";

    controller.addOrganisation(userId, orgaId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void addOrganisationBadParamsNoUser() {
    String userId = "12345678-0000-0000-0004-XX0000000000";
    String orgaId = "00000000-0000-0000-0008-300000000000";

    controller.addOrganisation(userId, orgaId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void addOrganisationBadParamsNoOrga() {
    String userId = "00000000-0000-0000-0004-400000000000";
    String orgaId = "12345678-0000-0000-0008-XX0000000000";

    controller.addOrganisation(userId, orgaId);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(String userId, String... orgaId) {
    Resources<Resource<OrganisationEntity>> result = (Resources<Resource<OrganisationEntity>>) 
        controller.readOrganisations(userId, null).getBody();
    assertThat(result.getContent()).haveExactly(orgaId.length, new Condition<>(
        p -> Arrays.asList(orgaId).contains(p.getContent().getId()), 
        "new organisation with given orga exists"));
  }
}
