package de.codeschluss.portal.integration.tag;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.tag.TagController;
import de.codeschluss.portal.components.tag.TagEntity;
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
public class TagControllerUpdateTest {

  @Autowired
  private TagController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    TagEntity tag = newTag("updateSuperUserOk", "updateSuperUserOk");
    String tagId = "00000000-0000-0000-0002-110000000000";

    controller.update(tag, tagId);

    Resource<TagEntity> result = (Resource<TagEntity>) controller.readOne(tagId);
    assertThat(result.getContent().getName()).isEqualTo(tag.getName());
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void updateSuperUserDuplicatedName() throws URISyntaxException {
    TagEntity tag = newTag("tag1", "tag1");
    String tagId = "00000000-0000-0000-0002-110000000000";

    controller.update(tag, tagId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderUserDenied() throws URISyntaxException {
    TagEntity tag = newTag("updateProviderUserDenied", "updateProviderUserDenied");
    String tagId = "00000000-0000-0000-0002-100000000000";

    controller.update(tag, tagId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    TagEntity tag = newTag("updateNoUserDenied", "updateNoUserDenied");
    String tagId = "00000000-0000-0000-0002-100000000000";

    controller.update(tag, tagId);
  }
  
  private TagEntity newTag(String name, String description) {
    TagEntity tag = new TagEntity();
    tag.setName(name);
    tag.setName(description);
    return tag;
  }

}
