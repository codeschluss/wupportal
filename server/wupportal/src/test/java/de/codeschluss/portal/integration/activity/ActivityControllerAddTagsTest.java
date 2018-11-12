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
public class ActivityControllerAddTagsTest {

	@Autowired
	private ActivityController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void addTagsSuperUserOK() throws URISyntaxException {
		String tagId = "00000000-0000-0000-0002-100000000000";
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		controller.addTags(activityId, tagId);
		
		Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getTags()).haveAtLeastOne(
				new Condition<>(t -> t.getId().equals(tagId),"tag exists"));
	}
	
	@Test
	@WithUserDetails("provider1@user")
	public void addTagsProviderOK() throws URISyntaxException {
		String tagId = "00000000-0000-0000-0002-100000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.addTags(activityId, tagId);
		
		Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getTags()).haveAtLeastOne(
				new Condition<>(t -> t.getId().equals(tagId),"tag exists"));
	}
	
	@Test
	@WithUserDetails("admin@user")
	public void addTagsAdminOK() throws URISyntaxException {
		String tagId = "00000000-0000-0000-0002-200000000000";
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.addTags(activityId, tagId);
		
		Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getTags()).haveAtLeastOne(
				new Condition<>(t -> t.getId().equals(tagId),"tag exists"));
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void addTagsOtherProviderDenied() throws URISyntaxException {
		String tagId = "00000000-0000-0000-0002-100000000000";
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.addTags(activityId, tagId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void addTagsNoUserDenied() throws URISyntaxException {
		String tagId = "00000000-0000-0000-0002-100000000000";
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.addTags(activityId, tagId);
	}
}
