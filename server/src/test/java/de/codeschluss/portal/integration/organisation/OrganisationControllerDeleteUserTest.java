package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.components.provider.ProviderService;
import de.codeschluss.portal.core.exception.NotFoundException;

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

@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback
public class OrganisationControllerDeleteUserTest {

  @Autowired
  private OrganisationController controller;

  @Autowired
  private ProviderService providerService;

  @Test(expected = NotFoundException.class)
  @WithUserDetails("super@user")
  public void deleteSuperUserOk() throws URISyntaxException {
    String orgaId = "00000000-0000-0000-0008-600000000000";
    String userId = "00000000-0000-0000-0004-200000000000";

    assertThat(providerService.getProviderByUserAndOrganisation(userId, orgaId)).isNotNull();

    controller.deleteUser(orgaId, userId);

    providerService.getProviderByUserAndOrganisation(userId, orgaId);
  }

  @Test(expected = NotFoundException.class)
  @WithUserDetails("admin@user")
  public void deleteAdminUserOk() throws URISyntaxException {
    String orgaId = "00000000-0000-0000-0008-100000000000";
    String userId = "00000000-0000-0000-0004-800000000000";

    assertThat(providerService.getProviderByUserAndOrganisation(userId, orgaId)).isNotNull();

    controller.deleteUser(orgaId, userId);

    providerService.getProviderByUserAndOrganisation(userId, orgaId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void deleteProviderUserDenied() throws URISyntaxException {
    String orgaId = "00000000-0000-0000-0008-100000000000";
    String userId = "00000000-0000-0000-0004-400000000000";

    controller.deleteUser(orgaId, userId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteNoUserDenied() {
    String orgaId = "00000000-0000-0000-0008-100000000000";
    String userId = "00000000-0000-0000-0004-400000000000";

    controller.deleteUser(orgaId, userId);
  }

}
