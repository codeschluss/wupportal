package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

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

import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.activity.ActivityEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ActivityControllerDeleteSchedulesTest {

	@Autowired
	private ActivityController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void deleteSchedulesSuperUserOK() throws URISyntaxException {
		String scheduleId = "00000000-0000-0000-0011-160000000000";
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		assertContaining(activityId, scheduleId);
		
		controller.deleteSchedules(activityId, scheduleId);
		
		assertNotContaining(activityId, scheduleId);
	}

	@Test
	@WithUserDetails("provider1@user")
	public void deleteSchedulesProviderOK() throws URISyntaxException {
		String scheduleId = "00000000-0000-0000-0011-170000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getSchedules()).haveAtLeastOne(
				new Condition<>(t -> t.getId().equals(scheduleId), "schedule exists"));
		
		controller.deleteSchedules(activityId, scheduleId);
		
		result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getSchedules()).noneMatch(t -> t.getId().equals(scheduleId));
	}
	
	@Test
	@WithUserDetails("admin@user")
	public void deleteSchedulesAdminOK() throws URISyntaxException {
		String scheduleId = "00000000-0000-0000-0011-180000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getSchedules()).haveAtLeastOne(
				new Condition<>(t -> t.getId().equals(scheduleId), "schedule exists"));
		
		controller.deleteSchedules(activityId, scheduleId);
		
		result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getSchedules()).noneMatch(t -> t.getId().equals(scheduleId));
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void deleteSchedulesOtherProviderDenied() throws URISyntaxException {
		String scheduleId = "00000000-0000-0000-0011-100000000000";
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.deleteSchedules(activityId, scheduleId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void deleteSchedulesNoUserDenied() throws URISyntaxException {
		String scheduleId = "00000000-0000-0000-0011-100000000000";
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.deleteSchedules(activityId, scheduleId);
	}
	
	private void assertContaining(String activityId, String scheduleId) {
		Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getSchedules()).haveAtLeastOne(
				new Condition<>(t -> t.getId().equals(scheduleId), "schedule exists"));
	}
	
	private void assertNotContaining(String activityId, String scheduleId) {
		Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getSchedules()).noneMatch(t -> t.getId().equals(scheduleId));
	}
}
