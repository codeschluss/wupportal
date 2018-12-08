package de.codeschluss.portal.integration.language;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.i18n.language.LanguageController;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LanguageControllerFindAllTest {

  @Autowired
  private LanguageController controller;

  private FilterSortPaginate params = new FilterSortPaginate("to", 0, 5, "name", "asc");

  @Test
  public void findAllWithoutPaginationOk() {
    FilterSortPaginate params = new FilterSortPaginate(null, null, null, "name", "asc");

    Resources<?> result = (Resources<?>) controller.readAll(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void findAllEmptyParamsOk() {
    FilterSortPaginate params = new FilterSortPaginate(null, null, null, null, null);

    Resources<?> result = (Resources<?>) controller.readAll(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void findAllWithPaginationOk() {
    PagedResources<?> result = (PagedResources<?>) controller.readAll(params).getBody();
    assertThat(result.getContent()).isNotEmpty();
  }

  @Test(expected = PropertyReferenceException.class)
  public void findAllWrongParams() {
    FilterSortPaginate params = new FilterSortPaginate("to", 1, 5, "blablabla123", "wrong");
    controller.readAll(params);
  }
}
