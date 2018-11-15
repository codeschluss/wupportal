package de.codeschluss.portal.integration.suburb;

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
import de.codeschluss.portal.functional.suburb.SuburbController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SuburbControllerDeleteTest {
	
	@Autowired
	private SuburbController controller;
	
	@Test(expected = NotFoundException.class)
	@WithUserDetails("super@user")
	public void deleteSuperUserOK() throws URISyntaxException {
		String suburbId = "00000000-0000-0000-0005-30000000000"; 
		assertThat(controller.findOne(suburbId)).isNotNull();
		
		controller.delete(suburbId);
		
		controller.findOne(suburbId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void deleteProviderUserDenied() throws URISyntaxException {
		String suburbId = "00000000-0000-0000-0005-10000000000"; 
		
		controller.delete(suburbId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void deleteOtherNotRegisteredDenied() {
		String suburbId = "00000000-0000-0000-0005-10000000000";
		
		controller.delete(suburbId);
	}

}
