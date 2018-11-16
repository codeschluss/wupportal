package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.NotFoundException;
import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.user.UserEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerFindUserTest {
	
	@Autowired
	private ActivityController controller;
	
	@Test
	@WithAnonymousUser
	@SuppressWarnings("unchecked")
	public void findUserOK() {
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		Resource<UserEntity> result = (Resource<UserEntity>) controller.findUser(activityId).getBody();
		
		assertThat(result.getContent()).isNotNull();
	}
	
	@Test
	@WithUserDetails("super@user")
	@SuppressWarnings("unchecked")
	public void findUserSuperUserShowUserFalseOK() {
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		Resource<UserEntity> result = (Resource<UserEntity>) controller.findUser(activityId).getBody();
		
		assertThat(result.getContent()).isNotNull();
	}
	
	@Test(expected = NotFoundException.class)
	@WithAnonymousUser
	public void findUserNotFound() {
		String activityId = "00000000-0000-0000-0010-XX0000000000";
		
		controller.findUser(activityId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithAnonymousUser
	public void findUserShowUserFalseDenied() {
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.findUser(activityId);
	}
}
