package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.activity.ActivityQueryParam;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerFindAllTest {

  @Autowired
  private ActivityController controller;

  private ActivityQueryParam params = new ActivityQueryParam(
      "activity", 0, 5, "name","asc", true, null, null, null);

  @Test
  public void findAllWithoutPaginationOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, "name", "asc", true, null, null, null);

    Resources<?> result = (Resources<?>) controller.findAll(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void findAllEmptyParamsOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, null, null, null, null);

    Resources<?> result = (Resources<?>) controller.findAll(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void findAllWithPaginationOk() {
    PagedResources<?> result = (PagedResources<?>) controller.findAll(params).getBody();
    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  @SuppressWarnings("unchecked")
  public void findAllCurrentTrueOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, true, null, null, null);
    
    String noFutureActivityId = "00000000-0000-0000-0010-180000000000";

    Resources<Resource<ActivityEntity>> result = (Resources<Resource<ActivityEntity>>) controller
        .findAll(params).getBody();

    assertThat(result.getContent())
        .noneMatch(a -> a.getContent().getId().equals(noFutureActivityId));
  }

  @Test
  @SuppressWarnings("unchecked")
  public void findAllCurrentFalseOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, false, null, null, null);
    String noFutureActivityId = "00000000-0000-0000-0010-180000000000";

    Resources<Resource<ActivityEntity>> result = (Resources<Resource<ActivityEntity>>) controller
        .findAll(params).getBody();

    assertThat(result.getContent()).haveExactly(1,
        new Condition<>(a -> a.getContent().getId().equals(noFutureActivityId), "activity exists"));
  }

  @Test(expected = PropertyReferenceException.class)
  public void findAllWrongParams() {
    ActivityQueryParam params = new ActivityQueryParam(
        "activity", 1, 5, "blablabla123", "wrong", true, null, null, null);
    controller.findAll(params);
  }
}
