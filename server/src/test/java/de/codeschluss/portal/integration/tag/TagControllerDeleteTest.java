package de.codeschluss.portal.integration.tag;

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
import de.codeschluss.portal.functional.tag.TagController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TagControllerDeleteTest {
	
	@Autowired
	private TagController controller;
	
	@Test(expected = NotFoundException.class)
	@WithUserDetails("super@user")
	public void deleteSuperUserOK() throws URISyntaxException {
		String tagId = "00000000-0000-0000-0002-900000000000"; 
		assertThat(controller.findOne(tagId)).isNotNull();
		
		controller.delete(tagId);
		
		controller.findOne(tagId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void deleteProviderUserDenied() throws URISyntaxException {
		String tagId = "00000000-0000-0000-0002-100000000000"; 
		
		controller.delete(tagId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void deleteOtherNotRegisteredDenied() {
		String tagId = "00000000-0000-0000-0002-100000000000";
		
		controller.delete(tagId);
	}

}
