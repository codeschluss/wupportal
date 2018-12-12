package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.tag.TagEntity;

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
public class ActivityControllerAddTagsTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("super@user")
  public void addTagsSuperUserOk() throws URISyntaxException {
    TagEntity tag = newTag("addTagsSuperUserOk", "addTagsSuperUserOk");
    String activityId = "00000000-0000-0000-0010-100000000000";

    controller.addTags(activityId, tag);

    assertContaining(tag, activityId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void addTagsProviderOk() throws URISyntaxException {
    TagEntity tag = newTag("addTagsProviderOk", "addTagsProviderOk");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.addTags(activityId, tag);

    assertContaining(tag, activityId);
  }

  @Test
  @WithUserDetails("admin@user")
  public void addTagsAdminOk() throws URISyntaxException {
    TagEntity tag = newTag("addTagsAdminOk", "addTagsAdminOk");
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.addTags(activityId, tag);

    assertContaining(tag, activityId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addTagsOtherProviderDenied() throws URISyntaxException {
    TagEntity tag = newTag("addTagsOtherProviderDenied", "addTagsOtherProviderDenied");
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.addTags(activityId, tag);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addTagsNoUserDenied() throws URISyntaxException {
    TagEntity tag = newTag("addTagsOtherProviderDenied", "addTagsOtherProviderDenied");
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.addTags(activityId, tag);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(TagEntity tag, String activityId) {
    Resources<Resource<TagEntity>> result = (Resources<Resource<TagEntity>>) controller
        .readTags(activityId, null).getBody();

    assertThat(result.getContent()).haveAtLeastOne(
        new Condition<>(t -> t.getContent().getName().equals(tag.getName()), "tag exists"));
  }
  
  private TagEntity newTag(String name, String description) {
    TagEntity tag = new TagEntity();
    tag.setName(name);
    tag.setName(description);
    return tag;
  }
}
