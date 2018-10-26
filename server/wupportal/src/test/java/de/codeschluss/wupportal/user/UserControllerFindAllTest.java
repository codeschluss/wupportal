package de.codeschluss.wupportal.user;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.wupportal.utils.FilterSortPaginate;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerFindAllTest {
	
    @Autowired
    private UserController controller;
    
    private FilterSortPaginate params = new FilterSortPaginate("test", 1, 5, "username", "asc");
	
	@Test
	@WithUserDetails("super@user")
	public void findAllWithSuperUserOK() {
		assertThat(controller.findAll(params).getStatusCode()).isEqualTo(HttpStatus.OK);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("admin@user")
	public void findAllWithAdminUserDenied() {
		controller.findAll(params);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void findAllWithProviderUserDenied() {
		controller.findAll(params);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("new@user")
	public void findAllWithNotApprovedUserUserDenied() {
		controller.findAll(params);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void findAllWithNoUserUserUserDenied() {
		controller.findAll(params);
	}
}
