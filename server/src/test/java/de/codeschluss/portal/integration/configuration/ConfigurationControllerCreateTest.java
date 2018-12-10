package de.codeschluss.portal.integration.configuration;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.config.ConfigurationController;
import de.codeschluss.portal.core.config.ConfigurationEntity;
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
public class ConfigurationControllerCreateTest {

  @Autowired
  private ConfigurationController controller;

  @Test
  @WithUserDetails("super@user")
  @SuppressWarnings("unchecked")
  public void addSuperUserOk() throws URISyntaxException {
    ConfigurationEntity configuration = new ConfigurationEntity("addSuperUserOk", "addSuperUserOk");

    controller.create(configuration);

    Resources<Resource<ConfigurationEntity>> result = (Resources<Resource<ConfigurationEntity>>) 
        controller.readAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getItem().equals(configuration.getItem()), "configuration exists"));
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void addSuperUserDuplicated() throws URISyntaxException {
    ConfigurationEntity configuration = new ConfigurationEntity("configuration1", "configuration1");

    controller.create(configuration);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addProviderDenied() throws URISyntaxException {
    ConfigurationEntity configuration = new ConfigurationEntity("addProviderDenied",
        "addProviderDenied");

    controller.create(configuration);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addNoUserDenied() throws URISyntaxException {
    ConfigurationEntity configuration = new ConfigurationEntity("addNoUserDenied",
        "addNoUserDenied");

    controller.create(configuration);
  }
}
