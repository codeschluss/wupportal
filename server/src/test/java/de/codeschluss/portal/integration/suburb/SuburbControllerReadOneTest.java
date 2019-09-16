package de.codeschluss.portal.integration.suburb;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.suburb.SuburbController;
import de.codeschluss.portal.components.suburb.SuburbEntity;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SuburbControllerReadOneTest {

  @Autowired
  private SuburbController controller;

  @Test
  public void findOneOk() {
    String suburbId = "00000000-0000-0000-0005-100000000000";

    Resource<SuburbEntity> result = (Resource<SuburbEntity>) controller.readOne(suburbId);

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findSuburbNotFound() {
    String suburbId = "00000000-0000-0000-0005-XX0000000000";

    controller.readOne(suburbId);
  }
}
