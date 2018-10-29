package de.codeschluss.wupportal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import de.codeschluss.wupportal.activity.ActivityEntity;
import de.codeschluss.wupportal.exception.BadParamsException;
import de.codeschluss.wupportal.user.UserController;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserControllerDeleteActivitiesForUserTest {

	@Autowired
    private UserController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void deleteForOtherUserSuperUserOK() {
		String userId = "00000000-0000-0000-0004-300000000000";
		String activityId = "00000000-0000-0000-0010-400000000000";
		Resources<ActivityEntity> result = (Resources<ActivityEntity>) controller.findActivitiesByUser(userId, new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).haveAtLeastOne(
				new Condition<>(p -> p.getId().equals(activityId), "activity exists"));
		
		controller.deleteProviderForUser(userId, activityId);
		
		result = (Resources<ActivityEntity>) controller.findActivitiesByUser(userId, new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).noneMatch(p -> p.getId().equals(activityId));
	}
	
	@Test
	@WithUserDetails("provider1@user")
	public void deleteProviderForOwnUserOK() {
		String userId = "00000000-0000-0000-0004-300000000000";
		String activityId = "00000000-0000-0000-0010-500000000000";
		
		Resources<ActivityEntity> result = (Resources<ActivityEntity>) controller.findActivitiesByUser(userId, new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).haveAtLeastOne(
				new Condition<>(p -> p.getId().equals(activityId), "activity exists"));
		
		controller.deleteActivityForUser(userId, activityId);
		
		result = (Resources<ActivityEntity>) controller.findActivitiesByUser(userId, new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).noneMatch(p -> p.getId().equals(activityId));
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("provider1@user")
	public void deleteActivityForNotMatchingIdsDenied() {
		String userId = "00000000-0000-0000-0004-300000000000";
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		controller.deleteActivityForUser(userId, activityId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void deleteActivityForOtherUserDenied() {
		String userId = "00000000-0000-0000-0004-200000000000";
		String ActivityId = "00000000-0000-0000-0010-100000000000";
		
		controller.deleteActivityForUser(userId, ActivityId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void deleteActivityForOtherUserNotRegisteredDenied() {
		String userId = "00000000-0000-0000-0004-800000000000";
		String activityId = "00000000-0000-0000-0010-800000000000";
		
		controller.deleteActivityForUser(userId, activityId);
	}
}
