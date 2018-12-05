package de.codeschluss.portal.integration.category;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.category.CategoryController;
import de.codeschluss.portal.components.category.translations.CategoryTranslatablesEntity;
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
public class CategoryControllerTranslationsTest {

  @Autowired
  private CategoryController controller;

  @Test
  @SuppressWarnings("unchecked")
  public void findTranslationsOk() {
    String categoryId = "00000000-0000-0000-0007-100000000000";

    Resources<Resource<CategoryTranslatablesEntity>> result = 
        (Resources<Resource<CategoryTranslatablesEntity>>) controller
        .findTranslations(categoryId).getBody();

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findTranslationsNotFound() {
    String categoryId = "00000000-0000-0000-0007-XX0000000000";

    controller.findTranslations(categoryId);
  }
}
