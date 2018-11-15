package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.activity.ActivityController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerDeleteTest {
	
	@Autowired
	private ActivityController controller;
	
	@Test(expected = NotFoundException.class)
	@WithUserDetails("super@user")
	public void deleteSuperUserOK() throws URISyntaxException {
		String activityId = "00000000-0000-0000-0010-230000000000"; 
		assertThat(controller.findOne(activityId)).isNotNull();
		
		controller.delete(activityId);
		
		controller.findOne(activityId);
	}
	
	@Test(expected = NotFoundException.class)
	@WithUserDetails("provider1@user")
	public void deleteProviderUserOwnOK() throws URISyntaxException {
		String activityId = "00000000-0000-0000-0010-220000000000"; 
		
		assertThat(controller.findOne(activityId)).isNotNull();
		
		controller.delete(activityId);
		
		controller.findOne(activityId);
	}
	
	@Test(expected = NotFoundException.class)
	@WithUserDetails("admin@user")
	public void deleteOrgaAdminUserOwnOK() throws URISyntaxException {
		String activityId = "00000000-0000-0000-0010-600000000000"; 
		
		assertThat(controller.findOne(activityId)).isNotNull();
		
		controller.delete(activityId);
		
		controller.findOne(activityId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void deleteProviderUserOtherOK() throws URISyntaxException {
		String activityId = "00000000-0000-0000-0010-300000000000"; 
		
		controller.delete(activityId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void deleteOtherNotRegisteredDenied() {
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.delete(activityId);
	}

}
