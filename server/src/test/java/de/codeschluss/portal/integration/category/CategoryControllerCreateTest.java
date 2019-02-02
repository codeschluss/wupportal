package de.codeschluss.portal.integration.category;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.category.CategoryController;
import de.codeschluss.portal.components.category.CategoryEntity;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

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
public class CategoryControllerCreateTest {

  @Autowired
  private CategoryController controller;

  @Test
  @WithUserDetails("super@user")
  @SuppressWarnings("unchecked")
  public void createSuperUserOk() throws Exception {
    CategoryEntity category = newCategory("createSuperUserOk", "createSuperUserOk",
        "createSuperUserOk");

    controller.create(category);

    Resources<Resource<CategoryEntity>> result = (Resources<Resource<CategoryEntity>>) controller
        .readAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getName().equals(category.getName()), "category exists"));
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidNameDenied() throws Exception {
    CategoryEntity category = newCategory("createNotValidNameDenied", "createNotValidNameDenied",
        null);

    controller.create(category);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidColorDenied() throws Exception {
    CategoryEntity category = newCategory(null, "createNotValidColorDenied",
        "createNotValidColorDenied");

    controller.create(category);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void createSuperUserDuplicated() throws Exception {
    CategoryEntity category = newCategory("createSuperUserDuplicatedName",
        "createSuperUserDuplicatedName", "category1");

    controller.create(category);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void createProviderDenied() throws Exception {
    CategoryEntity category = newCategory("createProviderDenied", "createProviderDenied",
        "createProviderDenied");

    controller.create(category);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void createNoUserDenied() throws Exception {
    CategoryEntity category = newCategory("createNoUserDenied", "createNoUserDenied",
        "createNoUserDenied");

    controller.create(category);
  }

  private CategoryEntity newCategory(String color, String description, String name) {
    CategoryEntity category = new CategoryEntity();
    category.setName(name);
    category.setColor(color);
    category.setDescription(description);
    return category;
  }
}
