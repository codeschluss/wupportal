package de.codeschluss.portal.integration.suburb;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.suburb.SuburbController;
import de.codeschluss.portal.components.suburb.SuburbEntity;
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
public class SuburbControllerAddTest {

  @Autowired
  private SuburbController controller;

  @Test
  @WithUserDetails("super@user")
  @SuppressWarnings("unchecked")
  public void addSuperUserOk() throws URISyntaxException {
    SuburbEntity suburb = new SuburbEntity("addSuperUserOk", null);

    controller.add(suburb);

    Resources<Resource<SuburbEntity>> result = (Resources<Resource<SuburbEntity>>) controller
        .findAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(
        new Condition<>(p -> p.getContent().getName().equals(suburb.getName()), "suburb exists"));
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void addSuperUserDuplicated() throws URISyntaxException {
    SuburbEntity suburb = new SuburbEntity("suburb1", null);

    controller.add(suburb);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addProviderDenied() throws URISyntaxException {
    SuburbEntity suburb = new SuburbEntity("addProviderDenied", null);

    controller.add(suburb);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addNoUserDenied() throws URISyntaxException {
    SuburbEntity suburb = new SuburbEntity("addNoUserDenied", null);

    controller.add(suburb);
  }
}
