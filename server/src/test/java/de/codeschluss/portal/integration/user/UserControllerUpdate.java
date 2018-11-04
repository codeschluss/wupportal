package de.codeschluss.portal.integration.user;

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

import de.codeschluss.portal.user.UserController;
import de.codeschluss.portal.user.UserEntity;
import de.codeschluss.portal.user.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserControllerUpdate {
	
	@Autowired
    private UserController controller;
	
	@Autowired
    private UserService service;
	
	@Test
	@WithUserDetails("provider1@user")
	public void updateOwnUserOK() throws URISyntaxException {
		UserEntity user = new UserEntity("provider1@user", "test", "12345678", true, "addWithoutSecurityOK", null);
		
		controller.update(user, "00000000-0000-0000-0004-300000000000");
		
		assertThat(service.getUser(user.getUsername()).getUsername()).isEqualTo(user.getUsername());
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider2@user")
	public void updateOtherUserDenied() throws URISyntaxException {
		UserEntity user = new UserEntity("provider1@user", "test", "12345678", true, "addWithoutSecurityOK", null);
		
		controller.update(user, "00000000-0000-0000-0004-300000000000");
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void updateOtherNotRegisteredUserDenied() throws URISyntaxException {
		UserEntity user = new UserEntity("provider1@user", "test", "12345678", true, "addWithoutSecurityOK", null);
		
		controller.update(user, "00000000-0000-0000-0004-300000000000");
	}

}
