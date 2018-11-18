package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.activity.ActivityEntity;

import java.net.URISyntaxException;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ActivityControllerDeleteTagsTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("super@user")
  public void deleteTagsSuperUserOk() throws URISyntaxException {
    String tagId = "00000000-0000-0000-0002-700000000000";
    String activityId = "00000000-0000-0000-0010-100000000000";

    assertContaining(activityId, tagId);

    controller.deleteTags(activityId, tagId);

    assertNotContaining(activityId, tagId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void deleteTagsProviderOk() throws URISyntaxException {
    String tagId = "00000000-0000-0000-0002-700000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
    assertThat(result.getContent().getTags())
        .haveAtLeastOne(new Condition<>(t -> t.getId().equals(tagId), "tag exists"));

    controller.deleteTags(activityId, tagId);

    result = (Resource<ActivityEntity>) controller.findOne(activityId);
    assertThat(result.getContent().getTags()).noneMatch(t -> t.getId().equals(tagId));
  }

  @Test
  @WithUserDetails("admin@user")
  public void deleteTagsAdminOk() throws URISyntaxException {
    String tagId = "00000000-0000-0000-0002-800000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";

    Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
    assertThat(result.getContent().getTags())
        .haveAtLeastOne(new Condition<>(t -> t.getId().equals(tagId), "tag exists"));

    controller.deleteTags(activityId, tagId);

    result = (Resource<ActivityEntity>) controller.findOne(activityId);
    assertThat(result.getContent().getTags()).noneMatch(t -> t.getId().equals(tagId));
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void deleteTagsOtherProviderDenied() throws URISyntaxException {
    String tagId = "00000000-0000-0000-0002-300000000000";
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.deleteTags(activityId, tagId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteTagsNoUserDenied() throws URISyntaxException {
    String tagId = "00000000-0000-0000-0002-300000000000";
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.deleteTags(activityId, tagId);
  }

  private void assertContaining(String activityId, String tagId) {
    Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
    assertThat(result.getContent().getTags())
        .haveAtLeastOne(new Condition<>(t -> t.getId().equals(tagId), "tag exists"));
  }

  private void assertNotContaining(String activityId, String tagId) {
    Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
    assertThat(result.getContent().getTags()).noneMatch(t -> t.getId().equals(tagId));
  }
}
