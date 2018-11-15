package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URISyntaxException;
import java.util.Date;

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
import de.codeschluss.portal.functional.schedule.ScheduleEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ActivityControllerAddSchedulesTest {

	@Autowired
	private ActivityController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void addSchedulesSuperUserOK() throws URISyntaxException {
		ScheduleEntity schedule = new ScheduleEntity(null, new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis() + 1000000));
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		controller.addSchedules(activityId, schedule);
		
		assertContaining(schedule, activityId);
	}

	@Test
	@WithUserDetails("provider1@user")
	public void addSchedulesProviderOK() throws URISyntaxException {
		ScheduleEntity schedule = new ScheduleEntity(null, new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis() + 1000000));
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.addSchedules(activityId, schedule);
		
		assertContaining(schedule, activityId);
	}
	
	@Test
	@WithUserDetails("admin@user")
	public void addSchedulesAdminOK() throws URISyntaxException {
		ScheduleEntity schedule = new ScheduleEntity(null, new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis() + 1000000));
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.addSchedules(activityId, schedule);
		
		assertContaining(schedule, activityId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void addSchedulesOtherProviderDenied() throws URISyntaxException {
		ScheduleEntity schedule = new ScheduleEntity(null, new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis() + 1000000));
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.addSchedules(activityId, schedule);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void addSchedulesNoUserDenied() throws URISyntaxException {
		ScheduleEntity schedule = new ScheduleEntity(null, new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis() + 1000000));
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.addSchedules(activityId, schedule);
	}
	
	private void assertContaining(ScheduleEntity schedule, String activityId) {
		Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getSchedules()).haveAtLeastOne(
				new Condition<>(s -> s.getStartDate().getTime() == schedule.getStartDate().getTime(),"schedule exists"));
	}
}
