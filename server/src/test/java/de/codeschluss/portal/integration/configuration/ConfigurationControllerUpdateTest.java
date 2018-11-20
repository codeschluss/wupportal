package de.codeschluss.portal.integration.configuration;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.configuration.ConfigurationController;
import de.codeschluss.portal.components.configuration.ConfigurationEntity;
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
public class ConfigurationControllerUpdateTest {

  @Autowired
  private ConfigurationController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    ConfigurationEntity configuration = new ConfigurationEntity("updateSuperUserOk",
        "updateSuperUserOk");
    String configurationId = "00000000-0000-0000-0001-000000000008";

    controller.update(configuration, configurationId);

    Resource<ConfigurationEntity> result = (Resource<ConfigurationEntity>) controller
        .findOne(configurationId);
    assertThat(result.getContent().getItem()).isEqualTo(configuration.getItem());
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void updateSuperUserDuplicatedName() throws URISyntaxException {
    ConfigurationEntity configuration = new ConfigurationEntity("configuration1",
        "updateSuperUserDuplicatedName");
    String configurationId = "00000000-0000-0000-0001-000000000009";

    controller.update(configuration, configurationId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderUserDenied() throws URISyntaxException {
    ConfigurationEntity configuration = new ConfigurationEntity("updateProviderUserDenied",
        "updateProviderUserDenied");
    String configurationId = "00000000-0000-0000-0001-000000000001";

    controller.update(configuration, configurationId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    ConfigurationEntity configuration = new ConfigurationEntity("updateNoUserDenied",
        "updateNoUserDenied");
    String configurationId = "00000000-0000-0000-0001-000000000001";

    controller.update(configuration, configurationId);
  }

}
