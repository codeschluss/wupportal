package de.codeschluss.portal.integration.language;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.i18n.language.LanguageController;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LanguageControllerReadOneTest {

  @Autowired
  private LanguageController controller;

  @Test
  public void findOneOk() {
    String languagesId = "00000000-0000-0000-0013-100000000000";

    Resource<LanguageEntity> result = (Resource<LanguageEntity>) controller.readOne(languagesId);

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findLanguageNotFound() {
    String languagesId = "00000000-0000-0000-0013-XX0000000000";

    controller.readOne(languagesId);
  }
}
