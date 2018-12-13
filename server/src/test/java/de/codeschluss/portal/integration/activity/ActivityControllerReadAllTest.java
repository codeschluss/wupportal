package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.activity.ActivityQueryParam;
import de.codeschluss.portal.core.api.dto.EmbeddedGraph;
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
import org.springframework.util.Base64Utils;

@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = ClassMode.BEFORE_CLASS)
public class ActivityControllerReadAllTest {

  @Autowired
  private ActivityController controller;

  private ActivityQueryParam defaultParams = new ActivityQueryParam(
      "activity", 0, 5, "name","asc", null, true, null, null, null);

  @Test
  public void readAllWithoutPaginationOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, "name", "asc", null, true, null, null, null);

    Resources<?> result = (Resources<?>) act(params);

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void readAllEmptyParamsOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, null, null, null, null, null);

    Resources<?> result = (Resources<?>) act(params);

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void readAllWithPaginationOk() {
    PagedResources<?> result = (PagedResources<?>) controller.readAll(defaultParams).getBody();
    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  public void readAllCurrentTrueOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, null, true, null, null, null);
    
    String noFutureActivityId = "00000000-0000-0000-0010-180000000000";

    Resources<Resource<ActivityEntity>> result = act(params);

    assertThat(result.getContent())
        .noneMatch(a -> a.getContent().getId().equals(noFutureActivityId));
  }

  @Test
  public void readAllCurrentFalseOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, null, false, null, null, null);
    String noFutureActivityId = "00000000-0000-0000-0010-180000000000";

    Resources<Resource<ActivityEntity>> result = act(params);

    assertThat(result.getContent()).haveExactly(1,
        new Condition<>(a -> a.getContent().getId().equals(noFutureActivityId), "activity exists"));
  }
  
  @Test
  public void readAllTextSearchTagOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        "tag1", null, null, null, null, null, false, null, null, null);
    String taggedActivity = "00000000-0000-0000-0010-100000000000";
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent()).haveExactly(1,
        new Condition<>(a -> a.getContent().getId().equals(taggedActivity), "activity exists"));
  }

  @Test
  public void readAllTextSearchTagWithCurrentTrueOk() {
    ActivityQueryParam params = new ActivityQueryParam(
        "tag1", null, null, null, null, null, true, null, null, null);
    String noFutureActivityId = "00000000-0000-0000-0010-180000000000";
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent())
      .noneMatch(a -> a.getContent().getId().equals(noFutureActivityId));
  }
  
  @Test
  public void readAllAdvancedSearchCategoryOk() {
    List<String> categories = new ArrayList<String>(
        Arrays.asList(new String[] {"00000000-0000-0000-0007-100000000000"}));
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, null, false, categories, null, null);
    String activityWithCategory = "00000000-0000-0000-0010-100000000000";
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent()).haveExactly(1, new Condition<>(a -> 
        a.getContent().getId().equals(activityWithCategory), "activity exists"));
    
  }
  
  @Test
  public void readAllAdvancedSearchSuburbOk() {
    List<String> suburbs = new ArrayList<String>(
        Arrays.asList(new String[] {"00000000-0000-0000-0005-100000000000"}));
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, null, false, null, suburbs, null);
    String activityWithSuburb = "00000000-0000-0000-0010-100000000000";
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent()).haveExactly(1, new Condition<>(a -> 
        a.getContent().getId().equals(activityWithSuburb), "activity exists"));
  }
  
  @Test
  public void readAllAdvancedSearchTargetGroupOk() {
    List<String> targetgroups = new ArrayList<String>(
        Arrays.asList(new String[] {"00000000-0000-0000-0003-100000000000"}));
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, null, false, null, null, targetgroups);
    String activityWithTargetGroup = "00000000-0000-0000-0010-100000000000";
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent()).haveExactly(1, new Condition<>(a -> 
        a.getContent().getId().equals(activityWithTargetGroup), "activity exists"));
  }
  
  @Test
  public void readWithEmbeddingsOk() throws JsonProcessingException {
    String bas64Embeddings = createBase64Embeddings();
    
    ActivityQueryParam params = new ActivityQueryParam(
        null, null, null, null, null, bas64Embeddings, false, null, null, null);
    
    Resources<Resource<ActivityEntity>> result = act(params);
    
    assertThat(result.getContent()).isNotEmpty();
    
  }

  private String createBase64Embeddings() throws JsonProcessingException {
    EmbeddedGraph suburb = new EmbeddedGraph();
    suburb.setName("suburb");
    
    EmbeddedGraph address = new EmbeddedGraph();
    address.setName("address");
    List<EmbeddedGraph> addressSub = new ArrayList<>();
    addressSub.add(suburb);
    address.setNodes(addressSub);
    
    EmbeddedGraph category = new EmbeddedGraph();
    category.setName("category");
    
    EmbeddedGraph organisation = new EmbeddedGraph();
    organisation.setName("organisation");
    
    EmbeddedGraph tags = new EmbeddedGraph();
    tags.setName("tags");
    
    EmbeddedGraph schedules = new EmbeddedGraph();
    schedules.setName("schedules");
    
    EmbeddedGraph user = new EmbeddedGraph();
    user.setName("user");
    
    EmbeddedGraph provider = new EmbeddedGraph();
    provider.setName("provider");
    List<EmbeddedGraph> providerList = new ArrayList<>();
    providerList.add(user);
    providerList.add(organisation);
    provider.setNodes(providerList);
    
    EmbeddedGraph activities = new EmbeddedGraph();
    activities.setName("activities");
    List<EmbeddedGraph> activityList = new ArrayList<>();
    activityList.add(address);
    activityList.add(category);
    activityList.add(provider);
    activityList.add(tags);
    activityList.add(schedules);
    activities.setNodes(activityList);
    
    ObjectMapper mapper = new ObjectMapper();
    return Base64Utils.encodeToString(mapper.writeValueAsString(activities).getBytes());
  }

  @Test(expected = NotFoundException.class)
  public void readNothingParams() {
    ActivityQueryParam params = new ActivityQueryParam(
        "nothingfound", 1, 5, null, null, null, false, null, null, null);
    act(params);
  }
  
  @Test(expected = PropertyReferenceException.class)
  public void readAllWrongParams() {
    ActivityQueryParam params = new ActivityQueryParam(
        "activity", 1, 5, "blablabla123", "wrong", null, true, null, null, null);
    act(params);
  }
  
  @SuppressWarnings("unchecked")
  private Resources<Resource<ActivityEntity>> act(ActivityQueryParam params) {
    return (Resources<Resource<ActivityEntity>>) controller
        .readAll(params).getBody();
  }
}
