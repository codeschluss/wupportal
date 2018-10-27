package de.codeschluss.wupportal.integration.user;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.wupportal.user.UserController;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerFindAllTest {
	
    @Autowired
    private UserController controller;
    
    private FilterSortPaginate params = new FilterSortPaginate("user", 1, 5, "username", "asc");
	
	@Test
	@WithUserDetails("super@user")
	public void findAllWithoutPaginationSuperUserOK() {
		FilterSortPaginate params = new FilterSortPaginate(null, null, null, "username", "asc");
		
		Resources<?> result = (Resources<?>) controller.findAll(params).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test
	@WithUserDetails("super@user")
	public void findAllEmptyParamsSuperUserOK() {
		FilterSortPaginate params = new FilterSortPaginate(null, null, null, null, null);
		
		Resources<?> result = (Resources<?>) controller.findAll(params).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
    
	@Test
	@WithUserDetails("super@user")
	public void findAllWithPaginationSuperUserOK() {
		PagedResources<?> result = (PagedResources<?>) controller.findAll(params).getBody();
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test(expected = InvalidDataAccessApiUsageException.class)
	@WithUserDetails("super@user")
	public void findAllWrongParamsSuperUser() {
		FilterSortPaginate params = new FilterSortPaginate("user", 1, 5, "blablabla123", "wrong");
		controller.findAll(params);
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
