package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;

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
public class OrganisationControllerFindAllTest {

  @Autowired
  private OrganisationController controller;

  private FilterSortPaginate params = new FilterSortPaginate("organisation", 1, 5, "name", "asc");

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
    FilterSortPaginate params = new FilterSortPaginate("organisation", 1, 5, "blablabla123",
        "wrong");
    controller.readAll(params);
  }
}
