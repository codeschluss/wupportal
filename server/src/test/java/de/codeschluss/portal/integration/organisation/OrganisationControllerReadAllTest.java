package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.components.organisation.OrganisationQueryParam;

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
public class OrganisationControllerReadAllTest {

  @Autowired
  private OrganisationController controller;

  private OrganisationQueryParam params = new OrganisationQueryParam("organisation", 1, 5, "name",
      "asc", null, null);

  @Test
  public void findAllWithoutPaginationOk() {
    OrganisationQueryParam params = new OrganisationQueryParam(null, null, null, "name", "asc",
        null, null);

    Resources<?> result = (Resources<?>) controller.readAll(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void findAllEmptyParamsOk() {
    OrganisationQueryParam params = new OrganisationQueryParam(null, null, null, null, null, null,
        null);

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
    OrganisationQueryParam params = new OrganisationQueryParam("organisation", 1, 5, "blablabla123",
        "wrong", null, null);
    controller.readAll(params);
  }
}
