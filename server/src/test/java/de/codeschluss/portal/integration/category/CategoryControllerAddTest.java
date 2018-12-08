package de.codeschluss.portal.integration.category;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.category.CategoryController;
import de.codeschluss.portal.components.category.CategoryEntity;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

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
public class CategoryControllerAddTest {

  @Autowired
  private CategoryController controller;

  @Test
  @WithUserDetails("super@user")
  @SuppressWarnings("unchecked")
  public void addSuperUserOk() throws URISyntaxException {
    CategoryEntity category = new CategoryEntity("addSuperUserOk", "addSuperUserOk",
        "addSuperUserOk", null, null);

    controller.add(category);

    Resources<Resource<CategoryEntity>> result = (Resources<Resource<CategoryEntity>>) controller
        .findAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getName().equals(category.getName()), "category exists"));
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void addSuperUserDuplicated() throws URISyntaxException {
    CategoryEntity category = new CategoryEntity("addSuperUserDuplicatedName",
        "addSuperUserDuplicatedName", "category1", null, null);

    controller.add(category);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addProviderDenied() throws URISyntaxException {
    CategoryEntity category = new CategoryEntity("addProviderDenied", "addProviderDenied",
        "addProviderDenied", null, null);

    controller.add(category);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addNoUserDenied() throws URISyntaxException {
    CategoryEntity category = new CategoryEntity("addNoUserDenied", "addNoUserDenied",
        "addNoUserDenied", null, null);

    controller.add(category);
  }
}
