package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.schedule.ScheduleEntity;
import de.codeschluss.portal.core.exception.BadParamsException;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
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
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ActivityControllerAddSchedulesTest {

  @Autowired
  private ActivityController controller;

  @Test
  @WithUserDetails("super@user")
  public void addSchedulesSuperUserOk() throws URISyntaxException {
    List<ScheduleEntity> schedule = new ArrayList<>();
    schedule.add(newSchedule());
    String activityId = "00000000-0000-0000-0010-100000000000";

    controller.addSchedules(activityId, schedule);

    assertContaining(schedule, activityId);
  }

  @Test
  @WithUserDetails("provider1@user")
  public void addSchedulesProviderOk() throws URISyntaxException {
    List<ScheduleEntity> schedule = new ArrayList<>();
    schedule.add(newSchedule());
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.addSchedules(activityId, schedule);

    assertContaining(schedule, activityId);
  }

  @Test
  @WithUserDetails("admin@user")
  public void addSchedulesAdminOk() throws URISyntaxException {
    List<ScheduleEntity> schedule = new ArrayList<>();
    schedule.add(newSchedule());
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.addSchedules(activityId, schedule);

    assertContaining(schedule, activityId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("provider1@user")
  public void addSchedulesNotValidDenied() throws URISyntaxException {
    List<ScheduleEntity> schedule = new ArrayList<>();
    schedule.add(new ScheduleEntity());
    String activityId = "00000000-0000-0000-0010-200000000000";

    controller.addSchedules(activityId, schedule);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void addSchedulesOtherProviderDenied() throws URISyntaxException {
    List<ScheduleEntity> schedule = new ArrayList<>();
    schedule.add(newSchedule());
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.addSchedules(activityId, schedule);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void addSchedulesNoUserDenied() throws URISyntaxException {
    List<ScheduleEntity> schedule = new ArrayList<>();
    schedule.add(newSchedule());
    String activityId = "00000000-0000-0000-0010-300000000000";

    controller.addSchedules(activityId, schedule);
  }

  @SuppressWarnings("unchecked")
  private void assertContaining(List<ScheduleEntity> schedules, String activityId) {
    Resources<Resource<ScheduleEntity>> result = (Resources<Resource<ScheduleEntity>>) controller
        .readSchedules(activityId, null).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(s -> schedules.stream().anyMatch(
        schedule -> schedule.getStartDate().getTime() == s.getContent().getStartDate().getTime()),
        "schedule exists"));
  }

  private ScheduleEntity newSchedule() {
    ScheduleEntity schedule = new ScheduleEntity();
    schedule.setStartDate(new Date(System.currentTimeMillis() + 1000000));
    schedule.setEndDate(new Date(System.currentTimeMillis() + 2000000));
    return schedule;
  }
}
