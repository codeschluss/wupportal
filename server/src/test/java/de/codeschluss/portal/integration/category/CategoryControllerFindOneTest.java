package de.codeschluss.portal.integration.category;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.functional.category.CategoryController;
import de.codeschluss.portal.functional.category.CategoryEntity;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CategoryControllerFindOneTest {

  @Autowired
  private CategoryController controller;

  @Test
  public void findOneOk() {
    String categoryId = "00000000-0000-0000-0007-100000000000";

    Resource<CategoryEntity> result = (Resource<CategoryEntity>) controller.findOne(categoryId);

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findCategoryNotFound() {
    String categoryId = "00000000-0000-0000-0007-XX0000000000";

    controller.findOne(categoryId);
  }
}
