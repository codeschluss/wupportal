package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class OrganisationControllerReadActivitiesTest {

  @Autowired
  private OrganisationController controller;

  @Test
  public void findActivitiesByOrganisationOk() {
    Resources<?> result = (Resources<?>) controller
        .readActivities("00000000-0000-0000-0008-100000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test(expected = NotFoundException.class)
  public void findActivitiesByOrganisationNotFound() {
    Resources<?> result = (Resources<?>) controller
        .readActivities("00000000-0000-0000-0008-XX0000000000").getBody();

    assertThat(result.getContent()).isNotEmpty();
  }
}
