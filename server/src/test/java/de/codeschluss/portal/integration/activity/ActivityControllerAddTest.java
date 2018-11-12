package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URISyntaxException;

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

import de.codeschluss.portal.common.exception.DuplicateEntryException;
import de.codeschluss.portal.common.utils.FilterSortPaginate;
import de.codeschluss.portal.functional.activity.ActivityController;
import de.codeschluss.portal.functional.activity.ActivityEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerAddTest {

	@Autowired
	private ActivityController controller;
	
	@Test
	@WithUserDetails("provider1@user")
	public void addProviderOK() throws URISyntaxException {
		ActivityEntity activity = createActivity("addProviderOK");
		
		controller.add(activity);
		
		Resources<Resource<ActivityEntity>> result = (Resources<Resource<ActivityEntity>>) controller.findAll(new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).haveAtLeastOne(
				new Condition<>(p -> p.getContent().getName().equals(activity.getName()),"activity exists"));
	}

	@Test(expected = DuplicateEntryException.class)
	@WithUserDetails("provider1@user")
	public void addProviderDuplicated() throws URISyntaxException {
		ActivityEntity activity = createActivity("activity1");
		
		controller.add(activity);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("super@user")
	public void addSuperUserIsNoProviderDenied() throws URISyntaxException {
		ActivityEntity activity = createActivity("addSuperUserOK");
		
		controller.add(activity);
		
		Resources<Resource<ActivityEntity>> result = (Resources<Resource<ActivityEntity>>) controller.findAll(new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).haveAtLeastOne(
				new Condition<>(p -> p.getContent().getName().equals(activity.getName()),"activity exists"));
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("new@user")
	public void addNotApprovedDenied() throws URISyntaxException {
		ActivityEntity activity = createActivity("addNotApprovedDenied");
		
		controller.add(activity);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void addNoUserDenied() throws URISyntaxException {
		ActivityEntity activity = createActivity("addNoUserDenied");
		
		controller.add(activity);
	}
	
	private ActivityEntity createActivity(String name) {
		String categoryId = "00000000-0000-0000-0007-100000000000";
		String organisationId = "00000000-0000-0000-0008-100000000000";
		String addressId = "00000000-0000-0000-0006-100000000000";
		
		return new ActivityEntity(name, "createActivity",true,addressId,null,categoryId,null,organisationId,null,null,null,null);
	}
}
