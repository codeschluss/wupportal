package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.activity.ActivityQueryParam;

import java.net.URISyntaxException;

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

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerCreateTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("provider1@user")
  public void addProviderOk() throws URISyntaxException {
    ActivityEntity activity = createActivity("addProviderOk");

    controller.create(activity);

    assertContaining(activity);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("super@user")
  public void addSuperUserIsNoProviderDenied() throws URISyntaxException {
    ActivityEntity activity = createActivity("addSuperUserOk");

    controller.create(activity);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("new@user")
  public void addNotApprovedProviderDenied() throws URISyntaxException {
    ActivityEntity activity = createActivity("addNotApprovedProviderDenied");

    controller.create(activity);
  }
  
  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("notapprovedorga@user")
  public void addNotApprovedOrgaDenied() throws URISyntaxException {
    ActivityEntity activity = createActivity("addNotApprovedOrgaDenied");

    controller.create(activity);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addNoUserDenied() throws URISyntaxException {
    ActivityEntity activity = createActivity("addNoUserDenied");

    controller.create(activity);
  }

  private ActivityEntity createActivity(String name) {
    String categoryId = "00000000-0000-0000-0007-100000000000";
    String organisationId = "00000000-0000-0000-0008-100000000000";
    String addressId = "00000000-0000-0000-0006-100000000000";

    return new ActivityEntity(name, "createActivity", true, addressId, null, categoryId, null,
        organisationId, null, null, null, null, null);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(ActivityEntity activity) {
    Resources<Resource<ActivityEntity>> result = (Resources<Resource<ActivityEntity>>) controller
        .readAll(new ActivityQueryParam()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getName().equals(activity.getName()), "activity exists"));
  }
}
