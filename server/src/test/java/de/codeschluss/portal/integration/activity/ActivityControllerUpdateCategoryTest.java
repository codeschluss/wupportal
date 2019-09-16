package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.category.CategoryEntity;
import de.codeschluss.portal.core.api.dto.StringPrimitive;
import de.codeschluss.portal.core.exception.BadParamsException;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback
public class ActivityControllerUpdateCategoryTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateCategorySuperUserOk() throws URISyntaxException {
    StringPrimitive categoryId = new StringPrimitive("00000000-0000-0000-0007-300000000000");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.updateCategory(activityId, categoryId);

    assertContaining(activityId, categoryId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void updateProviderOk() throws URISyntaxException {
    StringPrimitive categoryId = new StringPrimitive("00000000-0000-0000-0007-200000000000");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.updateCategory(activityId, categoryId);

    assertContaining(activityId, categoryId);
  }

  @Test
  @WithUserDetails("admin@user")
  public void updateAdminOk() throws URISyntaxException {
    StringPrimitive categoryId = new StringPrimitive("00000000-0000-0000-0007-100000000000");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.updateCategory(activityId, categoryId);

    assertContaining(activityId, categoryId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateSuperActivityBadParam() throws URISyntaxException {
    StringPrimitive categoryId = new StringPrimitive("00000000-0000-0000-0007-300000000000");
    String activityId = "00000000-0000-0000-0010-XX0000000000";

    controller.updateCategory(activityId, categoryId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderCategoryBadParam() throws URISyntaxException {
    StringPrimitive categoryId = new StringPrimitive("00000000-0000-0000-0007-XX0000000000");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.updateCategory(activityId, categoryId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateOtherProviderDenied() throws URISyntaxException {
    StringPrimitive categoryId = new StringPrimitive("00000000-0000-0000-0007-300000000000");
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.updateCategory(activityId, categoryId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    StringPrimitive categoryId = new StringPrimitive("00000000-0000-0000-0007-300000000000");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.updateCategory(activityId, categoryId);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(String activityId, StringPrimitive categoryId) {
    Resource<CategoryEntity> result = (Resource<CategoryEntity>) controller.readCategory(activityId)
        .getBody();
    assertThat(result.getContent().getId()).isEqualTo(categoryId.getValue());
  }
}
