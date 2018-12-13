package de.codeschluss.portal.integration.category;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.category.CategoryController;
import de.codeschluss.portal.components.category.CategoryEntity;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

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
public class CategoryControllerUpdateTest {

  @Autowired
  private CategoryController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    CategoryEntity category = newCategory("green", "updateSuperUserOk", "category2");
    String categoryId = "00000000-0000-0000-0007-200000000000";

    controller.update(category, categoryId);

    Resource<CategoryEntity> result = (Resource<CategoryEntity>) controller.readOne(categoryId);
    assertThat(result.getContent().getName()).isEqualTo(category.getName());
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateNotValidNameDenied() throws URISyntaxException {
    CategoryEntity category = newCategory("updateNotValidNameDenied", "updateNotValidNameDenied",
        null);
    String categoryId = "00000000-0000-0000-0007-200000000000";

    controller.update(category, categoryId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateNotValidColorDenied() throws URISyntaxException {
    CategoryEntity category = newCategory(null, "updateNotValidColorDenied",
        "updateNotValidColorDenied");
    String categoryId = "00000000-0000-0000-0007-200000000000";

    controller.update(category, categoryId);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void updateSuperUserDuplicatedName() throws URISyntaxException {
    CategoryEntity category = newCategory("updateSuperUserDuplicatedName",
        "updateSuperUserDuplicatedName", "category1");
    String categoryId = "00000000-0000-0000-0007-200000000000";

    controller.update(category, categoryId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderUserDenied() throws URISyntaxException {
    CategoryEntity category = newCategory("updateProviderUserDenied", "updateProviderUserDenied",
        "updateProviderUserDenied");
    String categoryId = "00000000-0000-0000-0007-100000000000";

    controller.update(category, categoryId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    CategoryEntity category = newCategory("updateNoUserDenied", "updateNoUserDenied",
        "updateNoUserDenied");
    String categoryId = "00000000-0000-0000-0007-100000000000";

    controller.update(category, categoryId);
  }

  private CategoryEntity newCategory(String color, String description, String name) {
    CategoryEntity category = new CategoryEntity();
    category.setName(name);
    category.setColor(color);
    category.setDescription(description);
    return category;
  }

}
