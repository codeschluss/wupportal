package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerReadAllTest {

  @Autowired
  private UserController controller;

  private FilterSortPaginate params = new FilterSortPaginate("user", 1, 5, "username", "asc", null);

  @Test
  @WithUserDetails("super@user")
  public void findAllWithoutPaginationSuperUserOk() {
    FilterSortPaginate params = new FilterSortPaginate(null, null, null, "username", "asc", null);

    Resources<?> result = (Resources<?>) controller.readAll(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  @WithUserDetails("super@user")
  public void findAllEmptyParamsSuperUserOk() {
    FilterSortPaginate params = new FilterSortPaginate(null, null, null, null, null, null);

    Resources<?> result = (Resources<?>) controller.readAll(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  @WithUserDetails("super@user")
  public void findAllWithPaginationSuperUserOk() {
    PagedResources<?> result = (PagedResources<?>) controller.readAll(params).getBody();
    assertThat(result.getContent()).isNotEmpty();
  }

  @Test(expected = PropertyReferenceException.class)
  @WithUserDetails("super@user")
  public void findAllWrongParamsSuperUser() {
    FilterSortPaginate params = new FilterSortPaginate("user", 1, 5, "blablabla123", "wrong", null);
    controller.readAll(params);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("admin@user")
  public void findAllWithAdminUserDenied() {
    controller.readAll(params);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void findAllWithProviderUserDenied() {
    controller.readAll(params);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("new@user")
  public void findAllWithNotApprovedUserUserDenied() {
    controller.readAll(params);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void findAllWithNoUserUserUserDenied() {
    controller.readAll(params);
  }
}
