package de.codeschluss.portal.integration.language;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.core.i18n.language.LanguageController;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;

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
  public void createSuperUserOk() throws Exception {
    LanguageEntity language = newLanguage("createSuperUserOk", "createSuperUserOk",
        "createSuperUserOk");

    controller.create(language);

    Resources<Resource<LanguageEntity>> result = (Resources<Resource<LanguageEntity>>) controller
        .readAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getName().equals(language.getName()), "language exists"));
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidLocaleDenied() throws Exception {
    LanguageEntity language = newLanguage(null, "createNotValidLocaleDenied",
        "createNotValidLocaleDenied");

    controller.create(language);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidNameDenied() throws Exception {
    LanguageEntity language = newLanguage("es", null, "createSuperUserDuplicatedLocale");

    controller.create(language);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void createSuperUserDuplicatedLocale() throws Exception {
    LanguageEntity language = newLanguage("es", "createSuperUserDuplicatedLocale",
        "createSuperUserDuplicatedLocale");

    controller.create(language);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void createSuperUserDuplicatedName() throws Exception {
    LanguageEntity language = newLanguage("createSuperUserDuplicatedName", "ToRead",
        "createSuperUserDuplicatedName");

    controller.create(language);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void createProviderDenied() throws Exception {
    LanguageEntity language = newLanguage("createProviderDenied", "createProviderDenied",
        "createProviderDenied");

    controller.create(language);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void createNoUserDenied() throws Exception {
    LanguageEntity language = newLanguage("createNoUserDenied", "createNoUserDenied",
        "createNoUserDenied");

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
