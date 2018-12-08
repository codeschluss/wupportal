package de.codeschluss.portal.integration.suburb;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.suburb.SuburbController;
import de.codeschluss.portal.components.suburb.SuburbEntity;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

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
public class SuburbControllerUpdateTest {

  @Autowired
  private SuburbController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    SuburbEntity suburb = new SuburbEntity("updateSuperUserOk", null);
    String suburbId = "00000000-0000-0000-0005-200000000000";

    controller.update(suburb, suburbId);

    Resource<SuburbEntity> result = (Resource<SuburbEntity>) controller.readOne(suburbId);
    assertThat(result.getContent().getName()).isEqualTo(suburb.getName());
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void updateSuperUserDuplicated() throws URISyntaxException {
    SuburbEntity suburb = new SuburbEntity("suburb1", null);
    String suburbId = "00000000-0000-0000-0005-200000000000";

    controller.update(suburb, suburbId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderUserDenied() throws URISyntaxException {
    SuburbEntity suburb = new SuburbEntity("suburb2", null);
    String suburbId = "00000000-0000-0000-0005-100000000000";

    controller.update(suburb, suburbId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    SuburbEntity suburb = new SuburbEntity("suburb2", null);
    String suburbId = "00000000-0000-0000-0005-100000000000";

    controller.update(suburb, suburbId);
  }

}
