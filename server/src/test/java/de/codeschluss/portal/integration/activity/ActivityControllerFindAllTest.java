package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.activity.ActivityQueryParam;
import de.codeschluss.portal.core.exception.NotFoundException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = ClassMode.BEFORE_CLASS)
public class ActivityControllerFindAllTest {

  @Autowired
  private ActivityController controller;

  private ActivityQueryParam defaultParams = new ActivityQueryParam(
      "activity", 0, 5, "name","asc", true, null, null, null);

  @Test
  public void findAllWithoutPaginationOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, "name", "asc", true, null, null, null);

    Resources<?> result = (Resources<?>) act(params);

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void findAllEmptyParamsOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, null, null, null, null);

    Resources<?> result = (Resources<?>) act(params);

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void findAllWithPaginationOk() {
    PagedResources<?> result = (PagedResources<?>) controller.findAll(defaultParams).getBody();
    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void findAllCurrentTrueOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, true, null, null, null);
    
    String noFutureActivityId = "00000000-0000-0000-0010-180000000000";

    Resources<Resource<ActivityEntity>> result = act(params);

    assertThat(result.getContent())
        .noneMatch(a -> a.getContent().getId().equals(noFutureActivityId));
  }

  @Test
  public void findAllCurrentFalseOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, false, null, null, null);
    String noFutureActivityId = "00000000-0000-0000-0010-180000000000";

    Resources<Resource<ActivityEntity>> result = act(params);

    assertThat(result.getContent()).haveExactly(1,
        new Condition<>(a -> a.getContent().getId().equals(noFutureActivityId), "activity exists"));
  }
  
  @Test
  public void findAllTextSearchTagOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        "tag1", null, null, null, null, false, null, null, null);
    String taggedActivity = "00000000-0000-0000-0010-100000000000";
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent()).haveExactly(1,
        new Condition<>(a -> a.getContent().getId().equals(taggedActivity), "activity exists"));
  }

  @Test
  public void findAllTextSearchTagWithCurrentTrueOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        "tag1", null, null, null, null, true, null, null, null);
    String noFutureActivityId = "00000000-0000-0000-0010-180000000000";
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent())
      .noneMatch(a -> a.getContent().getId().equals(noFutureActivityId));
  }
  
  @Test
  public void findAllAdvancedSearchCategoryOk() {
    List<String> categories = new ArrayList<String>(
        Arrays.asList(new String[] {"00000000-0000-0000-0007-100000000000"}));
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, false, categories, null, null);
    String activityWithCategory = "00000000-0000-0000-0010-100000000000";
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent()).haveExactly(1, new Condition<>(a -> 
        a.getContent().getId().equals(activityWithCategory), "activity exists"));
    
  }
  
  @Test
  public void findAllAdvancedSearchSuburbOk() {
    List<String> suburbs = new ArrayList<String>(
        Arrays.asList(new String[] {"00000000-0000-0000-0005-100000000000"}));
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, false, null, suburbs, null);
    String activityWithSuburb = "00000000-0000-0000-0010-100000000000";
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent()).haveExactly(1, new Condition<>(a -> 
        a.getContent().getId().equals(activityWithSuburb), "activity exists"));
  }
  
  @Test
  public void findAllAdvancedSearchTargetGroupOk() {
    List<String> targetgroups = new ArrayList<String>(
        Arrays.asList(new String[] {"00000000-0000-0000-0003-100000000000"}));
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, false, null, null, targetgroups);
    String activityWithTargetGroup = "00000000-0000-0000-0010-100000000000";
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent()).haveExactly(1, new Condition<>(a -> 
        a.getContent().getId().equals(activityWithTargetGroup), "activity exists"));
  }

  @Test(expected = NotFoundException.class)
  public void findNothingParams() {
    ActivityQueryParam params = new ActivityQueryParam(
        "nothingfound", 1, 5, null, null, false, null, null, null);
    act(params);
  }
  
  @Test(expected = PropertyReferenceException.class)
  public void findAllWrongParams() {
    ActivityQueryParam params = new ActivityQueryParam(
        "activity", 1, 5, "blablabla123", "wrong", true, null, null, null);
    act(params);
  }
  
  @SuppressWarnings("unchecked")
  private Resources<Resource<ActivityEntity>> act(ActivityQueryParam params) {
    return (Resources<Resource<ActivityEntity>>) controller
        .findAll(params).getBody();
  }
}
