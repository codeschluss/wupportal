package de.codeschluss.portal.integration.tag;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.tag.TagController;
import de.codeschluss.portal.components.tag.translations.TagTranslatablesEntity;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TagControllerTranslationsTest {

  @Autowired
  private TagController controller;

  @Test
  @SuppressWarnings("unchecked")
  public void findTranslationsOk() {
    String tagId = "00000000-0000-0000-0002-100000000000";

    Resources<Resource<TagTranslatablesEntity>> result = 
        (Resources<Resource<TagTranslatablesEntity>>) controller
        .findTranslations(tagId).getBody();

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findTranslationsNotFound() {
    String tagId = "00000000-0000-0000-0002-XX0000000000";

    controller.findTranslations(tagId);
  }
}
