package de.codeschluss.portal.integration.organisation;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.organisation.OrganisationController;
import de.codeschluss.portal.components.organisation.translations.OrganisationTranslatablesEntity;
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
public class OrganisationControllerTranslationsTest {

  @Autowired
  private OrganisationController controller;

  @Test
  @SuppressWarnings("unchecked")
  public void findTranslationsOk() {
    String organisationId = "00000000-0000-0000-0008-100000000000";

    Resources<Resource<OrganisationTranslatablesEntity>> result = 
        (Resources<Resource<OrganisationTranslatablesEntity>>) controller
        .readTranslations(organisationId).getBody();

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findTranslationsNotFound() {
    String organisationId = "00000000-0000-0000-0008-XX0000000000";

    controller.readTranslations(organisationId);
  }
}
