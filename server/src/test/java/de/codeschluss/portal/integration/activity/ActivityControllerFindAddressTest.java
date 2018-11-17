package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.address.AddressEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerFindAddressTest {

	@Autowired
	private ActivityController controller;
	
	@SuppressWarnings("unchecked")
	@Test
	public void findAddressOK() {
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		Resource<AddressEntity> result = (Resource<AddressEntity>) controller.findAddress(activityId).getBody();
		
		assertThat(result.getContent()).isNotNull();
	}
	
	@Test(expected = NotFoundException.class)
	public void findAddressNotFound() {
		String activityId = "00000000-0000-0000-0010-XX0000000000";
		
		controller.findOne(activityId);
	}
}
