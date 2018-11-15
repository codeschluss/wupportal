package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.portal.common.exception.BadParamsException;
import de.codeschluss.portal.functional.user.UserController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerGrantSuperuserRightTest {

    @Autowired
    private UserController controller;
    
    
	@Test
	@WithUserDetails("super@user")
	public void GrantSuperuserOK() {
		String otherUserId = "00000000-0000-0000-0004-110000000000";
		
		ResponseEntity<?> result = (ResponseEntity<?>) controller.grantSuperuserRight(otherUserId, true);
		
		assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
		assertThat(controller.findOne(otherUserId).getContent().isSuperuser()).isTrue();
	}
	
	@Test
	@WithUserDetails("super@user")
	public void TakeSuperuserOK() {
		String otherUserId = "00000000-0000-0000-0004-120000000000";
		
		ResponseEntity<?> result = (ResponseEntity<?>) controller.grantSuperuserRight(otherUserId, false);
		
		assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
		assertThat(controller.findOne(otherUserId).getContent().isSuperuser()).isFalse();
	}
	
	@Test(expected = BadParamsException.class)
	@WithUserDetails("super@user")
	public void TakeSuperuserBadRequest() {
		String notExistingUserId = "12345678-0000-0000-0004-XX0000000000";
		
		controller.grantSuperuserRight(notExistingUserId, false);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void GrantSuperuserDenied() {
		String otherUserId = "00000000-0000-0000-0004-200000000000";
		
		controller.grantSuperuserRight(otherUserId, true);
	}
    
}
