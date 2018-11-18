package de.codeschluss.portal.integration.targetgroup;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.functional.targetgroup.TargetGroupController;
import de.codeschluss.portal.functional.targetgroup.TargetGroupEntity;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TargetGroupControllerFindOneTest {

  @Autowired
  private TargetGroupController controller;

  @Test
  public void findOneOk() {
    String targetGroupId = "00000000-0000-0000-0003-100000000000";

    Resource<TargetGroupEntity> result = (Resource<TargetGroupEntity>) controller
        .findOne(targetGroupId);

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findTargetGroupNotFound() {
    String targetGroupId = "00000000-0000-0000-0003-XX0000000000";

    controller.findOne(targetGroupId);
  }
}
