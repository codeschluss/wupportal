package de.codeschluss.portal.integration.configuration;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.functional.configuration.ConfigurationController;
import de.codeschluss.portal.functional.configuration.ConfigurationEntity;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ConfigurationControllerFindOneTest {

  @Autowired
  private ConfigurationController controller;

  @Test
  public void findOneOk() {
    String configurationId = "00000000-0000-0000-0001-000000000008";

    Resource<ConfigurationEntity> result = (Resource<ConfigurationEntity>) controller
        .findOne(configurationId);

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findConfigurationNotFound() {
    String configurationId = "00000000-0000-0000-0001-XX0000000000";

    controller.findOne(configurationId);
  }
}
