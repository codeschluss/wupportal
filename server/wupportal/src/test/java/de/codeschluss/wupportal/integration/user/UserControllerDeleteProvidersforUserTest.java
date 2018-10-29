package de.codeschluss.wupportal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import de.codeschluss.wupportal.provider.ProviderEntity;
import de.codeschluss.wupportal.user.UserController;
import de.codeschluss.wupportal.utils.FilterSortPaginate;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserControllerDeleteProvidersforUserTest {

	@Autowired
    private UserController controller;
	
	@Test
	@WithUserDetails("super@user")
	public void deleteForOtherUserSuperUserOK() {
		String userId = "00000000-0000-0000-0004-800000000000";
		String providerId = "00000000-0000-0000-0009-500000000000";
		Resources<ProviderEntity> result = (Resources<ProviderEntity>) controller.findProvidersByUser(userId, new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).haveAtLeastOne(
				new Condition<>(p -> p.getId().equals(providerId), "provider exists"));
		
		controller.deleteProviderforUser(userId, providerId);
		
		result = (Resources<ProviderEntity>) controller.findProvidersByUser(userId, new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).noneMatch(p -> p.getId().equals(providerId));
	}
	
	@Test
	@WithUserDetails("provider3@user")
	public void deleteProviderForOwnUserOK() {
		String userId = "00000000-0000-0000-0004-800000000000";
		String providerId = "00000000-0000-0000-0009-700000000000";
		Resources<ProviderEntity> result = (Resources<ProviderEntity>) controller.findProvidersByUser(userId, new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).haveAtLeastOne(
				new Condition<>(p -> p.getId().equals(providerId), "provider exists"));
		
		controller.deleteProviderforUser(userId, providerId);
		
		result = (Resources<ProviderEntity>) controller.findProvidersByUser(userId, new FilterSortPaginate()).getBody();
		assertThat(result.getContent()).noneMatch(p -> p.getId().equals(providerId));
	}
	
	@Test(expected = AccessDeniedException.class)
	@WithUserDetails("provider1@user")
	public void deleteProviderForOtherUserDenied() {
		String userId = "00000000-0000-0000-0004-800000000000";
		String providerId = "00000000-0000-0000-0009-800000000000";
		
		controller.deleteProviderforUser(userId, providerId);
	}
	
	@Test(expected = AuthenticationCredentialsNotFoundException.class)
	public void deleteProviderForOtherUserNotRegisteredDenied() {
		String userId = "00000000-0000-0000-0004-800000000000";
		String providerId = "00000000-0000-0000-0009-800000000000";
		
		controller.deleteProviderforUser(userId, providerId);
	}
}
