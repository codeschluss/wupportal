package de.codeschluss.portal.integration.tag;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.tag.TagController;
import de.codeschluss.portal.components.tag.TagEntity;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

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
public class TagControllerCreateTest {

  @Autowired
  private TagController controller;

  @Test
  @WithUserDetails("super@user")
  public void createSuperUserOk() throws Exception {
    TagEntity tag = newTag("createSuperUserOk", "createSuperUserOk");

    controller.create(tag);

    assertContaining(tag);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void createProviderUserOk() throws Exception {
    TagEntity tag = newTag("createProviderUserOk", "createProviderUserOk");

    controller.create(tag);

    assertContaining(tag);
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotvalidOk() throws Exception {
    TagEntity tag = newTag(null, "createNotvalidOk");

    controller.create(tag);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void createSuperUserDuplicated() throws Exception {
    TagEntity tag = newTag("tag1", "tag1");

    controller.create(tag);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("new@user")
  public void createNotApprovedDenied() throws Exception {
    TagEntity tag = newTag("createNotApprovedDenied", "createNotApprovedDenied");

    controller.create(tag);
  }
  
  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("notapprovedorga@user")
  public void createNotApprovedOrgaDenied() throws Exception {
    TagEntity tag = newTag("createNotApprovedDenied", "createNotApprovedDenied");

    controller.create(tag);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void createNoUserDenied() throws Exception {
    TagEntity tag = newTag("createNoUserDenied", "createNoUserDenied");

    controller.create(tag);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(TagEntity tag) {
    Resources<Resource<TagEntity>> result = (Resources<Resource<TagEntity>>) controller
        .readAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(
        new Condition<>(p -> p.getContent().getName().equals(tag.getName()), "tag exists"));
  }
  
  private TagEntity newTag(String name, String description) {
    TagEntity tag = new TagEntity();
    tag.setName(name);
    tag.setDescription(description);
    return tag;
  }
}
