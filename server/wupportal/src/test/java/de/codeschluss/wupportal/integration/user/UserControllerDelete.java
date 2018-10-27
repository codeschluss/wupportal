package de.codeschluss.wupportal.integration.user;

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
import org.springframework.transaction.annotation.Transactional;

import de.codeschluss.wupportal.exception.NotFoundException;
import de.codeschluss.wupportal.user.UserController;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserControllerDelete {
	
	@Autowired
    private UserController controller;
	
	@Test(expected = NotFoundException.class)
	@WithUserDetails("super@user")
	public void deleteOtherSuperUserOK() throws URISyntaxException {
		String userId = "00000000-0000-0000-0004-600000000000"; 
		assertThat(controller.findOne(userId)).isNotNull();
		
		controller.delete(userId);
		
		controller.findOne(userId);
	}
		
	@Test(expected = NotFoundException.class)
	@WithUserDetails("owndelete@user")
	public void deleteOwnUserOK() throws URISyntaxException {
		String userId = "00000000-0000-0000-0004-700000000000"; 
		assertThat(controller.findOne(userId)).isNotNull();
		
		controller.delete(userId);
		
		controller.findOne(userId);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void deleteOtherUserDenied() throws URISyntaxException {
		String userId = "00000000-0000-0000-0004-100000000000"; 
		
		controller.delete(userId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void deleteOtherNotRegisteredDenied() {
		String otherUserId = "00000000-0000-0000-0004-100000000000";
		
		controller.delete(otherUserId);
	}


}
