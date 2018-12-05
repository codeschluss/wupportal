package de.codeschluss.portal.integration.language;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.core.i18n.language.LanguageController;
import de.codeschluss.portal.core.i18n.language.LanguageEntity;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback
public class LanguageControllerUpdateTest {

  @Autowired
  private LanguageController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    LanguageEntity language = 
        new LanguageEntity("fr", "updateSuperUserOk");
    String languageId = "00000000-0000-0000-0013-200000000000";

    controller.update(language, languageId);

    Resource<LanguageEntity> result = (Resource<LanguageEntity>) controller.findOne(languageId);
    assertThat(result.getContent().getName()).isEqualTo(language.getName());
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void updateSuperUserDuplicatedLocale() throws URISyntaxException {
    LanguageEntity language = 
        new LanguageEntity("es", "updateSuperUserDuplicatedLocale");
    String languageId = "00000000-0000-0000-0013-200000000000";

    controller.update(language, languageId);
  }
  
  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void updateSuperUserDuplicatedName() throws URISyntaxException {
    LanguageEntity language = 
        new LanguageEntity("updateSuperUserDuplicatedName", "ToRead");
    String languageId = "00000000-0000-0000-0013-200000000000";

    controller.update(language, languageId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderUserDenied() throws URISyntaxException {
    LanguageEntity language = 
        new LanguageEntity("updateProviderUserDenied", "updateProviderUserDenied");
    String languageId = "00000000-0000-0000-0013-100000000000";

    controller.update(language, languageId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    LanguageEntity language = 
        new LanguageEntity("updateNoUserDenied", "updateNoUserDenied");
    String languageId = "00000000-0000-0000-0013-100000000000";

    controller.update(language, languageId);
  }

}
