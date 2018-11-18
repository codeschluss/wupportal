package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerUpdateOrganisationTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("provider2@user")
  public void updateProviderOk() throws URISyntaxException {
    String organisationId = "00000000-0000-0000-0008-200000000000";
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.updateOrganisation(activityId, organisationId);

    assertContaing(activityId, organisationId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderOrganisationBadParam() throws URISyntaxException {
    String organisationId = "00000000-0000-0000-0008-XX0000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.updateOrganisation(activityId, organisationId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderActivityDenied() throws URISyntaxException {
    String organisationId = "00000000-0000-0000-0008-200000000000";
    String activityId = "00000000-0000-0000-0010-XX0000000000";

    controller.updateOrganisation(activityId, organisationId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    String organisationId = "00000000-0000-0000-0006-300000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.updateOrganisation(activityId, organisationId);
  }

  @SuppressWarnings("unchecked")
  private void assertContaing(String activityId, String organisationId) {
    Resource<OrganisationEntity> result = (Resource<OrganisationEntity>) controller
        .findOrganisation(activityId).getBody();
    assertThat(result.getContent().getId()).isEqualTo(organisationId);
  }
}
