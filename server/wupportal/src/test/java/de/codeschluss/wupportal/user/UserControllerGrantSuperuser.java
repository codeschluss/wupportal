package de.codeschluss.wupportal.user;

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

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerGrantSuperuser {

    @Autowired
    private UserController controller;
    
    
	@Test
	@WithUserDetails("super@user")
	public void GrantSuperuserOK() {
		String otherUserId = "00000000-0000-0000-0004-110000000000";
		
		ResponseEntity<?> result = (ResponseEntity<?>) controller.grantSuperuser(true, otherUserId);
		
		assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
		assertThat(controller.findOne(otherUserId).getContent().isSuperuser()).isTrue();
	}
	
	@Test
	@WithUserDetails("super@user")
	public void TakeSuperuserOK() {
		String otherUserId = "00000000-0000-0000-0004-120000000000";
		
		ResponseEntity<?> result = (ResponseEntity<?>) controller.grantSuperuser(false, otherUserId);
		
		assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
		assertThat(controller.findOne(otherUserId).getContent().isSuperuser()).isFalse();
	}
	
	@Test
	@WithUserDetails("super@user")
	public void TakeSuperuserBadRequest() {
		String notExistingUserId = "12345678-0000-0000-0004-XX0000000000";
		
		ResponseEntity<?> result = (ResponseEntity<?>) controller.grantSuperuser(false, notExistingUserId);
		
		assertThat(result.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void GrantSuperuserDenied() {
		String otherUserId = "00000000-0000-0000-0004-200000000000";
		
		controller.grantSuperuser(true, otherUserId);
	}
    
}
