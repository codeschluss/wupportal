package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.core.exception.BadParamsException;

import org.assertj.core.api.Condition;
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
public class OrganisationControllerDeleteActivitiesTest {

  @Autowired
  private OrganisationController controller;

  @Test
  @WithUserDetails("super@user")
  public void deleteForOtherSuperUserOk() {
    String organisationId = "00000000-0000-0000-0008-100000000000";
    String activityId = "00000000-0000-0000-0010-190000000000";

    assertContaining(organisationId, activityId);

    controller.deleteActivity(organisationId, activityId);

    assertNotContaining(organisationId, activityId);
  }

  @Test
  @WithUserDetails("admin@user")
  public void deleteOwnOrganisationOk() {
    String organisationId = "00000000-0000-0000-0008-100000000000";
    String activityId = "00000000-0000-0000-0010-210000000000";

    assertContaining(organisationId, activityId);

    controller.deleteActivity(organisationId, activityId);

    assertNotContaining(organisationId, activityId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("admin@user")
  public void deleteActivityForNotMatchingIdsDenied() {
    String organisationId = "00000000-0000-0000-0008-100000000000";
    String activityId = "00000000-0000-0000-0010-900000000000";

    controller.deleteActivity(organisationId, activityId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void deleteForOtherDenied() {
    String organisationId = "00000000-0000-0000-0008-100000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.deleteActivity(organisationId, activityId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteForOtherNotRegisteredDenied() {
    String organisationId = "00000000-0000-0000-0008-100000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.deleteActivity(organisationId, activityId);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(String organisationId, String activityId) {
    Resources<Resource<ActivityEntity>> result = (Resources<Resource<ActivityEntity>>) controller
        .readActivities(organisationId, null).getBody();
    assertThat(result.getContent()).haveAtLeastOne(
        new Condition<>(p -> p.getContent().getId().equals(activityId), "activity exists"));
  }

  @SuppressWarnings("unchecked")
  private void assertNotContaining(String organisationId, String activityId) {
    Resources<Resource<ActivityEntity>> result = (Resources<Resource<ActivityEntity>>) controller
        .readActivities(organisationId, null).getBody();
    assertThat(result.getContent()).noneMatch(p -> p.getContent().getId().equals(activityId));
  }
}
