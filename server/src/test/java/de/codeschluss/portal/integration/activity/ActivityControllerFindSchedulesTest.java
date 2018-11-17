package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.schedule.ScheduleEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerFindSchedulesTest {

	@Autowired
	private ActivityController controller;
	
	@Test
	@SuppressWarnings("unchecked")
	public void findSchedulesOK() {
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		Resources<Resource<ScheduleEntity>> result = (Resources<Resource<ScheduleEntity>>) controller.findSchedules(activityId).getBody();
		
		assertThat(result.getContent()).isNotNull();
	}
	
	@Test(expected = NotFoundException.class)
	public void findScheduleNotFound() {
		String activityId = "00000000-0000-0000-0010-XX0000000000";
		
		controller.findSchedules(activityId);
	}
}
