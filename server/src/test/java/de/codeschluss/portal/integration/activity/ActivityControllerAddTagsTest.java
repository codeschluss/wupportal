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
import de.codeschluss.portal.functional.tag.TagEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ActivityControllerAddTagsTest {

	@Autowired
	private ActivityController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void addTagsSuperUserOK() throws URISyntaxException {
		TagEntity tag = new TagEntity("addTagsSuperUserOK", "addTagsSuperUserOK",null);
		String activityId = "00000000-0000-0000-0010-100000000000";
		
		controller.addTags(activityId, tag);
		
		assertContaining(tag, activityId);
	}

	@Test
	@WithUserDetails("provider1@user")
	public void addTagsProviderOK() throws URISyntaxException {
		TagEntity tag = new TagEntity("addTagsProviderOK", "addTagsProviderOK",null);
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.addTags(activityId, tag);
		
		assertContaining(tag, activityId);
	}
	
	@Test
	@WithUserDetails("admin@user")
	public void addTagsAdminOK() throws URISyntaxException {
		TagEntity tag = new TagEntity("addTagsAdminOK", "addTagsAdminOK",null);
		String activityId = "00000000-0000-0000-0010-200000000000";
		
		controller.addTags(activityId, tag);
		
		assertContaining(tag, activityId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void addTagsOtherProviderDenied() throws URISyntaxException {
		TagEntity tag = new TagEntity("addTagsOtherProviderDenied", "addTagsOtherProviderDenied",null);
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.addTags(activityId, tag);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void addTagsNoUserDenied() throws URISyntaxException {
		TagEntity tag = new TagEntity("addTagsNoUserDenied", "addTagsNoUserDenied",null);
		String activityId = "00000000-0000-0000-0010-300000000000";
		
		controller.addTags(activityId, tag);
	}
	
	private void assertContaining(TagEntity tag, String activityId) {
		Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller.findOne(activityId);
		assertThat(result.getContent().getTags()).haveAtLeastOne(
				new Condition<>(t -> t.getName().equals(tag.getName()),"tag exists"));
	}
}
