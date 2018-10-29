package de.codeschluss.wupportal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import de.codeschluss.wupportal.provider.ProviderEntity;
import de.codeschluss.wupportal.user.UserController;
import de.codeschluss.wupportal.user.UserEntity;
import de.codeschluss.wupportal.user.UserService;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerAddProvidersforUserTest {

	@Autowired
    private UserController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void addSingleProviderForOtherUserSuperUserOK() {
		ProviderEntity provider1 = new ProviderEntity(false,false,null,null, null);
		Resources<?> result = (Resources<?>) controller.addProvidersforUser("00000000-0000-0000-0004-300000000000", providers).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test
	@WithUserDetails("super@user")
	public void findProvidersByUserEmptyParamsSuperUserOK() {
		FilterSortPaginate params = new FilterSortPaginate(null, null, null, null, null);
		
		Resources<?> result = (Resources<?>) controller.findProvidersByUser("00000000-0000-0000-0004-300000000000", params).getBody();
		
		assertThat(result.getContent()).isNotEmpty();
	}
    
	@Test
	@WithUserDetails("super@user")
	public void findProvidersByUserWithPaginationSuperUserOK() {
		PagedResources<?> result = (PagedResources<?>) controller.findProvidersByUser("00000000-0000-0000-0004-300000000000", params).getBody();
		assertThat(result.getContent()).isNotEmpty();
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("admin@user")
	public void findAllWithAdminUserDenied() {
		controller.findProvidersByUser("00000000-0000-0000-0004-300000000000", params);
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void findAllWithProviderUserDenied() {
		controller.findProvidersByUser("00000000-0000-0000-0004-400000000000", params);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void findAllWithNoUserUserUserDenied() {
		controller.findProvidersByUser("00000000-0000-0000-0004-400000000000", params);
	}
}
