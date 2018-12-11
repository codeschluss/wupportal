package de.codeschluss.portal.integration.language;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.core.i18n.language.LanguageController;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;

import java.net.URISyntaxException;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LanguageControllerCreateTest {

  @Autowired
  private LanguageController controller;

  @Test
  @WithUserDetails("super@user")
  @SuppressWarnings("unchecked")
  public void addSuperUserOk() throws URISyntaxException {
    LanguageEntity language = newLanguage("addSuperUserOk", "addSuperUserOk",
        "addSuperUserOk");

    controller.create(language);

    Resources<Resource<LanguageEntity>> result = (Resources<Resource<LanguageEntity>>) controller
        .readAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getName().equals(language.getName()), "language exists"));
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void addSuperUserDuplicatedLocale() throws URISyntaxException {
    LanguageEntity language = newLanguage("es", "addSuperUserDuplicatedLocale",
        "addSuperUserDuplicatedLocale");

    controller.create(language);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void addSuperUserDuplicatedName() throws URISyntaxException {
    LanguageEntity language = newLanguage("addSuperUserDuplicatedName", "ToRead",
        "addSuperUserDuplicatedName");

    controller.create(language);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addProviderDenied() throws URISyntaxException {
    LanguageEntity language = newLanguage("addProviderDenied", "addProviderDenied",
        "addProviderDenied");

    controller.create(language);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addNoUserDenied() throws URISyntaxException {
    LanguageEntity language = newLanguage("addNoUserDenied", "addNoUserDenied",
        "addNoUserDenied");

    controller.create(language);
  }
  
  private LanguageEntity newLanguage(String locale, String name, String machineTranslated) {
    LanguageEntity language = new LanguageEntity();
    language.setLocale(locale);
    language.setName(name);
    language.setMachineTranslated(machineTranslated);
    return language;
  }
}
