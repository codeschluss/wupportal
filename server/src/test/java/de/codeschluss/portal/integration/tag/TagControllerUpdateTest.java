package de.codeschluss.portal.integration.tag;

import static org.assertj.core.api.Assertions.assertThat;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.functional.tag.TagController;
import de.codeschluss.portal.functional.tag.TagEntity;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TagControllerUpdateTest {
	
	@Autowired
	private TagController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void updateSuperUserOK() throws URISyntaxException {
		TagEntity tag = new TagEntity("updateSuperUserOK", "updateSuperUserOK", null);	
		String tagId = "00000000-0000-0000-0002-110000000000";
		
		controller.update(tag, tagId);
		
		Resource<TagEntity> result = (Resource<TagEntity>) controller.findOne(tagId);
		assertThat(result.getContent().getName()).isEqualTo(tag.getName());
	}
	
	@Test(expected = DuplicateEntryException.class)
	@WithUserDetails("super@user")
	public void updateSuperUserDuplicatedName() throws URISyntaxException {
		TagEntity tag = new TagEntity("tag1", "tag1", null);	
		String tagId = "00000000-0000-0000-0002-110000000000";
		
		controller.update(tag, tagId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void updateProviderUserDenied() throws URISyntaxException {
		TagEntity tag = new TagEntity("updateProviderUserDenied", "updateProviderUserDenied", null);		
		String tagId = "00000000-0000-0000-0002-100000000000";
		
		controller.update(tag, tagId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void updateNoUserDenied() throws URISyntaxException {
		TagEntity tag = new TagEntity("updateNoUserDenied", "updateNoUserDenied", null);			
		String tagId = "00000000-0000-0000-0002-100000000000";
		
		controller.update(tag, tagId);
	}

}
