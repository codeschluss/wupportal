package de.codeschluss.portal.integration.targetgroup;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.targetgroup.TargetGroupController;
import de.codeschluss.portal.components.targetgroup.TargetGroupEntity;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

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
public class TargetGroupControllerCreateTest {

  @Autowired
  private TargetGroupController controller;

  @Test
  @WithUserDetails("super@user")
  @SuppressWarnings("unchecked")
  public void createSuperUserOk() throws URISyntaxException {
    TargetGroupEntity targetGroup = newTargetGroup("createSuperUserOk", "createSuperUserOk");

    controller.create(targetGroup);

    Resources<Resource<TargetGroupEntity>> result = (Resources<Resource<TargetGroupEntity>>) 
        controller.readAll(new FilterSortPaginate()).getBody();

    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getName().equals(targetGroup.getName()), "targetGroup exists"));
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidDenied() throws URISyntaxException {
    TargetGroupEntity targetGroup = newTargetGroup("createNotValidDenied", null);

    controller.create(targetGroup);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void createSuperUserDuplicated() throws URISyntaxException {
    TargetGroupEntity targetGroup = newTargetGroup("target1", "target1");

    controller.create(targetGroup);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void createProviderDenied() throws URISyntaxException {
    TargetGroupEntity targetGroup = newTargetGroup("createProviderDenied", "createProviderDenied");

    controller.create(targetGroup);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void createNoUserDenied() throws URISyntaxException {
    TargetGroupEntity targetGroup = newTargetGroup("createNoUserDenied", "createNoUserDenied");

    controller.create(targetGroup);
  }
  
  private TargetGroupEntity newTargetGroup(String description, String name) {
    TargetGroupEntity targetGroup = new TargetGroupEntity();
    targetGroup.setDescription(description);
    targetGroup.setName(name);
    return targetGroup;
  }
}
