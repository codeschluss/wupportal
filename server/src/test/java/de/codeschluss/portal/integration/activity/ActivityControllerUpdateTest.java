package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.activity.ActivityQueryParam;
import de.codeschluss.portal.core.exception.BadParamsException;

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
public class ActivityControllerUpdateTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    ActivityEntity activity = createActivity("updateSuperUserOk");
    String activityId = "00000000-0000-0000-0010-100000000000";

    controller.update(activity, activityId);

    assertContaining(activity);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void updateProviderOk() throws URISyntaxException {
    ActivityEntity activity = createActivity("updateProviderOk");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.update(activity, activityId);

    assertContaining(activity);
  }

  @Test
  @WithUserDetails("admin@user")
  public void updateAdminOk() throws URISyntaxException {
    ActivityEntity activity = createActivity("updateAdminOk");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.update(activity, activityId);

    assertContaining(activity);
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("provider1@user")
  public void updateNotValidContactDenied() throws URISyntaxException {
    String addressId = "00000000-0000-0000-0006-100000000000";
    String categoryId = "00000000-0000-0000-0007-100000000000";
    String organisationId = "00000000-0000-0000-0008-100000000000";
    ActivityEntity activity = new ActivityEntity();
    activity.setAddressId(addressId);
    activity.setCategoryId(categoryId);
    activity.setOrganisationId(organisationId);
    activity.setName("createNotValidContactDenied");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.update(activity, activityId);
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("provider1@user")
  public void updateNotValidNameDenied() throws URISyntaxException {
    String addressId = "00000000-0000-0000-0006-100000000000";
    String categoryId = "00000000-0000-0000-0007-100000000000";
    String organisationId = "00000000-0000-0000-0008-100000000000";
    ActivityEntity activity = new ActivityEntity();
    activity.setAddressId(addressId);
    activity.setCategoryId(categoryId);
    activity.setOrganisationId(organisationId);
    activity.setPhone("123456");
    activity.setMail("createNotValidNameDenied");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.update(activity, activityId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateOtherProviderDenied() throws URISyntaxException {
    ActivityEntity activity = createActivity("updateOtherProviderDenied");
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.update(activity, activityId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    ActivityEntity activity = createActivity("updateNoUserDenied");
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.update(activity, activityId);
  }

  private ActivityEntity createActivity(String name) {
    ActivityEntity activity = new ActivityEntity();
    
    String addressId = "00000000-0000-0000-0006-100000000000";
    String categoryId = "00000000-0000-0000-0007-100000000000";
    String organisationId = "00000000-0000-0000-0008-100000000000";
    
    activity.setName(name);
    activity.setMail("createActivity");
    activity.setPhone("123456789");
    activity.setAddressId(addressId);
    activity.setCategoryId(categoryId);
    activity.setOrganisationId(organisationId);
    
    return activity;
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(ActivityEntity activity) {
    Resources<Resource<ActivityEntity>> result = (Resources<Resource<ActivityEntity>>) controller
        .readAll(new ActivityQueryParam()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getName().equals(activity.getName()), "activity exists"));
  }
}
