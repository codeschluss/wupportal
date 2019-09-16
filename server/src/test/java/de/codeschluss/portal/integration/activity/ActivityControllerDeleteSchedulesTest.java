package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.schedule.ScheduleEntity;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

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
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@Rollback
public class ActivityControllerDeleteSchedulesTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("super@user")
  public void deleteSchedulesSuperUserOk() throws URISyntaxException {
    List<String> scheduleId = new ArrayList<>();
    scheduleId.add("00000000-0000-0000-0011-160000000000");
    String activityId = "00000000-0000-0000-0010-100000000000";

    assertContaining(activityId, scheduleId);

    controller.deleteSchedules(activityId, scheduleId);

    assertNotContaining(activityId, scheduleId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void deleteSchedulesProviderOk() throws URISyntaxException {
    List<String> scheduleId = new ArrayList<>();
    scheduleId.add("00000000-0000-0000-0011-170000000000");
    String activityId = "00000000-0000-0000-0010-200000000000";

    assertContaining(activityId, scheduleId);
    
    controller.deleteSchedules(activityId, scheduleId);

    assertNotContaining(activityId, scheduleId);
  }

  @Test
  @WithUserDetails("admin@user")
  public void deleteSchedulesAdminOk() throws URISyntaxException {
    List<String> scheduleId = new ArrayList<>();
    scheduleId.add("00000000-0000-0000-0011-190000000000");
    String activityId = "00000000-0000-0000-0010-200000000000";

    assertContaining(activityId, scheduleId);
    
    controller.deleteSchedules(activityId, scheduleId);

    assertNotContaining(activityId, scheduleId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void deleteSchedulesOtherProviderDenied() throws URISyntaxException {
    List<String> scheduleId = new ArrayList<>();
    scheduleId.add("00000000-0000-0000-0011-100000000000");
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.deleteSchedules(activityId, scheduleId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteSchedulesNoUserDenied() throws URISyntaxException {
    List<String> scheduleId = new ArrayList<>();
    scheduleId.add("00000000-0000-0000-0011-100000000000");
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.deleteSchedules(activityId, scheduleId);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(String activityId, List<String> scheduleIds) {
    Resources<Resource<ScheduleEntity>> result = (Resources<Resource<ScheduleEntity>>) controller
        .readSchedules(activityId, null).getBody();
    assertThat(result.getContent()).haveAtLeastOne(
        new Condition<>(t -> scheduleIds.contains(t.getContent().getId()), "schedule exists"));
  }

  @SuppressWarnings("unchecked")
  private void assertNotContaining(String activityId, List<String> scheduleIds) {
    Resources<Resource<ScheduleEntity>> result = (Resources<Resource<ScheduleEntity>>) controller
        .readSchedules(activityId, null).getBody();
    assertThat(result.getContent()).noneMatch(t -> scheduleIds.contains(t.getContent().getId()));
  }
}
