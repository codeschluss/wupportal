package de.codeschluss.portal.integration.suburb;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.suburb.SuburbController;
import de.codeschluss.portal.components.suburb.SuburbEntity;
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
public class SuburbControllerCreateTest {

  @Autowired
  private SuburbController controller;

  @Test
  @WithUserDetails("super@user")
  @SuppressWarnings("unchecked")
  public void createSuperUserOk() throws Exception {
    SuburbEntity suburb = newSuburb("createSuperUserOk");

    controller.create(suburb);

    Resources<Resource<SuburbEntity>> result = (Resources<Resource<SuburbEntity>>) controller
        .readAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(
        new Condition<>(p -> p.getContent().getName().equals(suburb.getName()), "suburb exists"));
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidDenied() throws Exception {
    SuburbEntity suburb = newSuburb(null);

    controller.create(suburb);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void createSuperUserDuplicated() throws Exception {
    SuburbEntity suburb = newSuburb("suburb1");

    controller.create(suburb);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void createProviderDenied() throws Exception {
    SuburbEntity suburb = newSuburb("createProviderDenied");

    controller.create(suburb);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void createNoUserDenied() throws Exception {
    SuburbEntity suburb = newSuburb("createNoUserDenied");

    controller.create(suburb);  
  }
  
  private SuburbEntity newSuburb(String name) {
    SuburbEntity suburb = new SuburbEntity();
    suburb.setName(name);
    return suburb;
  }
}
